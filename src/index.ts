// TODO: Make a file system based command system. Currently for this amount of commands, hardcoding them is fine but for more flexability, this should be refactored.

import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
import fuzzysort from "fuzzysort";
import { schedule } from "node-cron";
import { NodeHtmlMarkdown } from "node-html-markdown";
import { prisma } from "./db";
import { getCurrentShrine, getPerks } from "./helpers/api";
import { remindUsers } from "./helpers/remind-users";
import { replacePerkDescriptionWithtunables } from "./helpers/replace-perk-description-with-tunables";
import { upsertPerks } from "./models/perk/upsert";
import { upsertShrine } from "./models/shrine/upsert";
import { insertPerk } from "./models/user/insert-perk";
import { getUserPerks } from "./models/user/perks";
import { removePerk } from "./models/user/remove-perk";
import { registerSlashCommands } from "./register-slash-commands";

const main = async () => {
  const perkNotFoundError =
    "Perk not found. Please use the available autocomplete and avoid typing the names yourself.";

  await upsertPerks(await getPerks());

  let shrine = await upsertShrine(await getCurrentShrine());

  let perks = await prisma.perk.findMany();

  await registerSlashCommands(perks);

  // Every day at midnight

  schedule("0 0 * * *", async () => {
    shrine = await upsertShrine(await getCurrentShrine());
    await upsertPerks(await getPerks());
    perks = await prisma.perk.findMany();

    const reminders = await remindUsers(shrine);
    for (const reminder of reminders) {
      try {
        const user = await client.users.fetch(reminder.userDiscordId);
        user.send(reminder.message);
      } catch (e) {}
    }
  });

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isAutocomplete()) {
      const perksToSearch =
        interaction.commandName === "remove-perk"
          ? await getUserPerks(interaction.user.id)
          : perks;

      const userInput = interaction.options.getFocused();

      interaction.respond(
        fuzzysort
          .go(userInput, perksToSearch, {
            key: "name",
            all: true,
            limit: 25,
          })
          .map(({ obj: perk }) => ({ name: perk.name, value: perk.modifier }))
      );
    }

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "add-perk") {
      const modifier = interaction.options.getString("modifier");
      const perk = perks.find((perk) => perk.modifier === modifier);
      if (!perk) await interaction.reply(perkNotFoundError);
      else {
        await insertPerk(
          interaction.user.id,
          interaction.user.username,
          perk.id
        );

        if (shrine.perks.find((shrinePerk) => shrinePerk.apiId === perk.apiId))
          await interaction.reply(
            `${perk.name} appears on the current shrine! I added it to the list in case it appears again.`
          );
        else
          await interaction.reply(
            `I will remind you when ${perk.name} appears on the shrine.`
          );
      }
    }

    if (interaction.commandName === "remove-perk") {
      const modifier = interaction.options.getString("modifier");
      const userPerks = await getUserPerks(interaction.user.id);
      const perk = userPerks.find((perk) => perk.modifier === modifier);
      if (!perk) await interaction.reply(perkNotFoundError);
      else {
        await removePerk(
          interaction.user.id,
          interaction.user.username,
          perk.id
        );
        await interaction.reply(
          `I won't remind you when ${perk.name} appears on the shrine anymore.`
        );
      }
    }

    if (interaction.commandName === "my-perks") {
      const perks = await getUserPerks(interaction.user.id);
      if (perks.length) {
        await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setThumbnail(interaction.user.avatarURL())
              .setColor(0x0099ff)
              .setTitle(`${interaction.user.username}'s list of perks`)
              .setDescription(
                "I will remind you when any of these perks appear on the Shrine Of Secrets."
              )
              .addFields(
                perks.map((perk, index) => ({
                  name: perk.name,
                  value: replacePerkDescriptionWithtunables(
                    NodeHtmlMarkdown.translate(perk.description),
                    perk.tunables as string[][]
                  ),
                }))
              ),
          ],
        });
      } else
        await interaction.reply(
          'No perk found. Try using the "/add-perk" command to add one.'
        );
    }
  });

  client.login(process.env.TOKEN);
};

main();

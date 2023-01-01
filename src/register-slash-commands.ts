import { Perk } from "@prisma/client";
import { REST, Routes } from "discord.js";
import { getCommands } from "./commands";

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

export const registerSlashCommands = async (perks: Perk[]) => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: await getCommands(perks),
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};

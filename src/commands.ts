import { Perk } from "@prisma/client";
import { SlashCommandBuilder } from "discord.js";

export const getCommands = (perks: Perk[]) => {
  const addPerk = new SlashCommandBuilder()
    .setName("add-perk")
    .setDescription("Adds a perk to the list of perks")
    .addStringOption((option) =>
      option
        .setName("modifier")
        .setDescription("Name of the wanted perk")
        .setRequired(true)
        .setAutocomplete(true)
    );

  const removePerk = new SlashCommandBuilder()
    .setName("remove-perk")
    .setDescription("Removes a perk from the list of perks")
    .addStringOption((option) =>
      option
        .setName("modifier")
        .setDescription("Name of the wanted perk")
        .setRequired(true)
        .setAutocomplete(true)
    );

  const myPerks = new SlashCommandBuilder()
    .setName("my-perks")
    .setDescription("Adds a perk to the list of perks");

  return [addPerk, removePerk, myPerks];
};

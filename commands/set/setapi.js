import { SlashCommandBuilder } from "discord.js";
import { setApiUrl } from "../../globals.js";
import { sanitizeUrl } from "../../utils.js";

const data = new SlashCommandBuilder()
  .setName("setapi")
  .setDescription(`Sets the current API url to interact with.`)
  .addStringOption((option) =>
    option
      .setName("url")
      .setDescription("The API url generated by --api cmd arg.")
      .setRequired(true)
  );

async function execute(interaction) {
  // Get the url arg
  let url = interaction.options.getString("url");
  let sanitizedUrl = sanitizeUrl(url);
  if (sanitizedUrl) {
    // Valid url
    setApiUrl(sanitizedUrl);
    await interaction.reply("Changed the API URL.");
  } else {
    // If the URL is invalid, send an error message
    await interaction.reply({
      content: "Invalid URL. Please provide a valid URL. Do not add any query params, only the origin part.",
      ephemeral: true,
    });
  }
}

export default {
  data,
  execute,
};

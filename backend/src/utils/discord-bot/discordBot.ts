import { Client, GatewayIntentBits } from "discord.js";
import MongoDB from "../../app/database/database";

const { DISCORD_BOT_TOKEN } = process.env;

export class DiscordBot {
  allowedRoles = [
    "Member",
    "Raider",
    "Core",
    "Grandmaster",
    "Assistant",
    "Raid Leader",
    "Guild Master",
    "Sentry",
  ];

  client: Client;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
    });

    // this.client.on("ready", this.insertAllUsers.bind(this));
    this.client.on("interactionCreate", this.test_connection.bind(this));
  }

  async insertAllUsers() {
    console.log(`Logged in as ${this.client.user?.tag}!`);

    const mongo_db = new MongoDB();
    await mongo_db.connect();

    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log("Timeout reached, stopping user insertion.");
        return;
      }, 5000);
    };

    resetTimeout();

    for (const guild of this.client.guilds.cache.values()) {
      console.log(`Server ID: ${guild.id}`, `Server name: ${guild.name}`);

      try {
        const members = await guild.members.fetch();
        for (const member of members.values()) {
          const userRoles = member.roles.cache.map((role) => role.name);
          const hasAllowedRole = userRoles.some((role) =>
            this.allowedRoles.includes(role),
          );

          if (hasAllowedRole) {
            const userData = {
              _id: member.id,
              username: member.user.username,
              display_name: member.displayName || "N/A",
              email: null,
              roles: userRoles,
              characters: null,
              administrator: false,
            };

            try {
              await mongo_db.insertUser(userData);
              console.log(`Saved user: ${member.user.username}`);
              resetTimeout(); // Reset timeout on activity
            } catch (error) {
              console.error("Error saving user:", error);
            }
          } else {
            console.log(
              `User ${member.user.username} does not have an allowed role.`,
            );
          }
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    }
  }

  async test_connection(interaction: any) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  }

  start() {
    this.client.login(DISCORD_BOT_TOKEN);
  }
}

// import { Client, GatewayIntentBits } from "discord.js";
// import MongoDB from "../../app/database/database";
// import { utils } from "../utils";

// const { DISCORD_BOT_TOKEN } = process.env;

// export type DiscordUserType = {
//   discordId: string;
//   username: string;
//   displayName: string | undefined;
//   email: string | undefined;
//   factions: string[];
//   highestRole: string;
//   characters: CharacterType[] | undefined;
//   joinedAt: Date | null;
//   administrator: boolean;
// };

// export type CharacterType = {
//   name: string;
//   class: string;
//   mainSpec: string;
//   gearScoreMainSpec: number;
//   offSpec: string | undefined;
//   gearScoreOffSpec: number | undefined;
//   skill: number | undefined;
//   faction: "Alliance" | "Horde";
// };

// export class DiscordBot {
//   allowedRoles = [
//     "Member",
//     "Raider",
//     "Core",
//     "Grandmaster",
//     "Assistant",
//     "Raid Leader",
//     "Guild Master",
//     "Alliance",
//     "Horde",
//   ];

//   client: Client;

//   constructor() {
//     this.client = new Client({
//       intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
//     });

//     this.client.on("interactionCreate", this.test_connection.bind(this));
//     // this.client.on("ready", this.insertAllUsers.bind(this));
//   }

//   async insertAllUsers() {
//     console.log(`Logged in as ${this.client.user?.tag}!`);

//     const mongo_db = new MongoDB();

//     let timeout: NodeJS.Timeout;

//     const resetTimeout = () => {
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         console.log("Timeout reached, stopping user insertion.");
//         return;
//       }, 5000);
//     };

//     resetTimeout();

//     for (const guild of this.client.guilds.cache.values()) {
//       console.log(`Server ID: ${guild.id}`, `Server name: ${guild.name}`);

//       try {
//         const members = await guild.members.fetch();
//         for (const member of members.values()) {
//           const userRoles = member.roles.cache.map((role) => role.name);
//           const hasAllowedRole = userRoles.some((role) =>
//             this.allowedRoles.includes(role),
//           );

//           if (hasAllowedRole) {
//             let factions = utils.getFactions(userRoles);
//             let highestRole = utils.getHighestRank(userRoles);

//             const userData: DiscordUserType = {
//               discordId: member.id,
//               username: member.user.username,
//               displayName: member.displayName || "N/A",
//               email: undefined,
//               factions: factions,
//               highestRole: highestRole,
//               joinedAt: member.joinedAt,
//               characters: undefined,
//               administrator: false,
//             };

//             try {
//               await mongo_db.insertUser(userData);
//               console.log(
//                 `User with id: ${member.id} was inserted in database.`,
//               );
//               resetTimeout(); // Reset timeout on activity
//             } catch (error) {
//               console.error("Error inserting user:", error);
//             }
//           } else {
//             console.log(
//               `User ${member.user.username} does not have an allowed role.`,
//             );
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching members:", error);
//       }
//     }
//   }

//   async test_connection(interaction: any) {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === "ping") {
//       await interaction.reply("Pong!");
//     }
//   }

//   start() {
//     this.client.login(DISCORD_BOT_TOKEN);
//   }
// }

// const bot = new DiscordBot();
// bot.start();

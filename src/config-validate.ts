import { Guild } from "discord.js";
import { config } from "./config";
import { emojiExists, isNotEmpty, isValidURl, roleExists } from "./util/misc/verify";

export async function validateConfigParameters(guild: Guild) {
	// URLs
	const urls = [config.iconURL, config.githubURL];
	urls
		.map((url) => ({ url, valid: isValidURl(url) }))
		.forEach((url) => {
			if (!url.valid) throw new Error(`Invalid URL: ${url.url}`);
		});

	// Strings
	const str = [config.botName];
	str.push(...config.pronounRoles.map((role) => role[0]));
	str
		.map((string) => ({ string, valid: isNotEmpty(string) }))
		.forEach((string) => {
			if (!string.valid) throw new Error(`Invalid string: ${string.string || "[empty string]"}`);
		});

	// Roles
	const roles = [config.adminRoleId, config.moderatorRoleId];
	roles
		.map((role) => ({ role, valid: roleExists(guild, role) }))
		.forEach(async (role) => {
			if (!(await role.valid)) throw new Error(`Invalid role: ${role.role}`);
		});

	// Emojis
	const emojis = config.pronounRoles.map((role) => role[1]);
	emojis
		.map((emoji) => ({
			emoji,
			valid: typeof emoji === "string" ? emojiExists(guild, emoji) : emoji === null,
		}))
		.forEach(async (emoji) => {
			if (!(await emoji.valid)) throw new Error(`Invalid emoji: ${emoji.emoji}`);
		});
}

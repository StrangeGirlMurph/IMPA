import "dotenv/config";
import {
	loadAutocompleters,
	loadButtons,
	loadCommands,
	loadEvents,
	loadModals,
	loadSelectMenus,
} from "./interactions/interactionLoader";
import { Client } from "discord.js";
import { ctx } from "./ctx";
import { logger } from "./logger";
import { config } from "./config";
import { Settings } from "luxon";

logger.debug("Creating client...");
const client = new Client({
	intents: ["Guilds", "GuildMembers", config.logActivity ? "GuildPresences" : "0"],
});

function shutdown(info: unknown) {
	logger.error("Shutting down unexpectedly...");
	logger.error(`Shutting down with info: ${info instanceof Error ? info.message : info}`);
	if (info instanceof Error) {
		logger.debug(info.stack);
	}
	client.destroy();
	process.exit(1);
}

process.on("unhandledRejection", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
process.on("uncaughtException", shutdown);

Settings.defaultZone = "utc+1";

logger.debug("Loading context...");
ctx.update(
	await loadCommands(),
	await loadButtons(),
	await loadSelectMenus(),
	await loadModals(),
	await loadAutocompleters()
);

await loadEvents(client);
logger.debug("Attempting login.");
await client.login(process.env.TOKEN);
logger.info("Successfully started application.");

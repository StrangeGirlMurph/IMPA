import { addDefaultEmbedFooter } from "../misc/embeds";
import { reminderDb, reminderTimeoutCache } from "../../db";
import { logger } from "../../logger";
import { Client, EmbedBuilder, TextBasedChannel } from "discord.js";

export async function elapse(client: Client, id: number): Promise<void> {
	const reminder = reminderDb.get(id);
	if (!reminder) return;
	const channel = (await client.channels.fetch(reminder.channelID)) as TextBasedChannel;
	await channel?.send({
		content: reminder.pings.join(" "),
		embeds: [
			addDefaultEmbedFooter(
				new EmbedBuilder().setTitle("Time is up!").setDescription(reminder.message || "I believe in you!")
			),
		],
	});
	reminderDb.delete(id);
	reminderTimeoutCache.delete(id);
}

export function schedulerTick(client: Client) {
	try {
		reminderDb.forEach((reminder, id) => {
			if (!reminderTimeoutCache.has(id) && reminder.timestamp <= Date.now() + 30 * 60 * 1000) {
				reminderTimeoutCache.set(
					id,
					setTimeout(() => elapse(client, id), reminder.timestamp - Date.now())
				);
			}
		});
	} catch (e) {
		logger.error("Error in reminder scheduler tick", e);
	}
}
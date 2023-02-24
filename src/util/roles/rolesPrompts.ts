import { config } from "../../config";
import { logger } from "../../logger";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
	StringSelectMenuBuilder,
} from "discord.js";
import { addEmbedColor } from "../misc/embeds";
import { bringIntoButtonGrid, setUpRoles } from "./rolesUtil";

export async function pronounPrompt(interaction: ChatInputCommandInteraction): Promise<void> {
	const prompt: EmbedBuilder = new EmbedBuilder()
		.setTitle("Pronomen Rollen 🏳‍⚧️⚧️")
		.setDescription(
			"Wähle die Pronomen, mit denen du angesprochen werden möchtest :)\nFalls du nicht verstehst, warum: https://pronouns.org/what-and-why"
		);

	const actionRows: ActionRowBuilder<ButtonBuilder>[] = [];
	const roles = bringIntoButtonGrid(config.pronounRoles);
	for (const row of roles) {
		actionRows.push(new ActionRowBuilder());
		for (const role of row) {
			actionRows[actionRows.length - 1].addComponents(
				new ButtonBuilder().setCustomId(`roles.${role[0]}`).setLabel(role[0]).setStyle(ButtonStyle.Secondary)
			);
			if (role[1]) {
				actionRows[actionRows.length - 1].components[
					actionRows[actionRows.length - 1].components.length - 1
				].setEmoji(role[1]);
			}
		}
	}

	if (
		await setUpRoles(
			interaction.guild,
			config.pronounRoles.map((r) => [r[0]]),
			"- StartPronounRoles -",
			"- EndPronounRoles -"
		)
	) {
		await interaction.editReply({
			embeds: [addEmbedColor(prompt)],
			components: actionRows,
		});
	} else {
		await interaction.editReply({ content: "Couldn't set up the roles..." });
		logger.error("Failed to set up pronoun roles.");
	}
}

export async function majorPrompt(interaction: ChatInputCommandInteraction): Promise<void> {
	const prompt: EmbedBuilder = new EmbedBuilder()
		.setTitle("Studiengang Rollen 📚")
		.setDescription("Wähle deinen Studiengang aus.");

	const actionRows: ActionRowBuilder<ButtonBuilder>[] = [];
	const roles = bringIntoButtonGrid(config.majorRoles.map((r) => [r]));
	for (const row of roles) {
		actionRows.push(new ActionRowBuilder());
		for (const [role] of row) {
			actionRows[actionRows.length - 1].addComponents(
				new ButtonBuilder().setCustomId(`roles.${role}`).setLabel(role).setStyle(ButtonStyle.Secondary)
			);
		}
	}

	if (
		await setUpRoles(
			interaction.guild,
			config.majorRoles.map((r) => [r]),
			"- StartMajorRoles -",
			"- EndMajorRoles -"
		)
	) {
		await interaction.editReply({
			embeds: [addEmbedColor(prompt)],
			components: actionRows,
		});
	} else {
		await interaction.editReply({ content: "Couldn't set up the roles..." });
		logger.error("Failed to set up pronoun roles.");
	}
}

export async function fachiniPrompt(interaction: ChatInputCommandInteraction): Promise<void> {
	const prompt: EmbedBuilder = new EmbedBuilder()
		.setTitle("Fachini Rolle 🌿")
		.setDescription(
			"Falls du dich für die IMP Fachschaftsinitiative interessierst, wirst du mit der Rolle über alle Sitzungen und Weiteres benachricht."
		);

	const actionRows: ActionRowBuilder<ButtonBuilder>[] = [
		new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId(`roles.fsi-interessiert`)
				.setLabel("fsi-interessiert")
				.setStyle(ButtonStyle.Secondary)
		),
	];

	await interaction.editReply({
		embeds: [addEmbedColor(prompt)],
		components: actionRows,
	});
}

export async function semesterPrompt(interaction: ChatInputCommandInteraction): Promise<void> {
	const prompt: EmbedBuilder = new EmbedBuilder()
		.setTitle("Semester Rollen 🌃")
		.setDescription("Wähle das Semester, seit dem du an der HU studierst.");

	const actionRow: ActionRowBuilder<StringSelectMenuBuilder> =
		new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
			new StringSelectMenuBuilder()
				.setCustomId("roles.semester")
				.addOptions(...config.semesterRoles.map((r) => ({ label: r, value: r })))
				.setPlaceholder("Select your semester")
				.setMaxValues(1)
				.setMinValues(1)
		);

	if (
		await setUpRoles(
			interaction.guild,
			config.semesterRoles.map((r) => [r]),
			"- StartSemesterRoles -",
			"- EndSemesterRoles -"
		)
	) {
		await interaction.editReply({ embeds: [addEmbedColor(prompt)], components: [actionRow] });
	} else {
		await interaction.editReply({ content: "Couldn't set up the roles..." });
		logger.error("Failed to set up semester roles.");
	}
}

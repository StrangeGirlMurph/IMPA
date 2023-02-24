import { SelectMenu } from "../interactionClasses";
import { inlineCode, StringSelectMenuInteraction } from "discord.js";
import { logger } from "../../logger";

class RoleSelectMenu extends SelectMenu {
	constructor() {
		super("roles");
	}

	async execute(interaction: StringSelectMenuInteraction, customID: string[]): Promise<void> {
		await interaction.deferReply({ ephemeral: true });

		if (customID[0] == "semester") {
			const semester = interaction.values[0] ?? "None";
			const guildRoles = await interaction.guild?.roles.fetch();
			const member = await interaction.guild?.members.fetch(interaction.user.id);
			const role = guildRoles?.find((r) => r.name === semester);
			if (!role || !member) {
				await interaction.editReply("Can't find the role or you (the member)...");
				logger.warn("Couldn't find a role or member. Probably is an old prompt still open.");
				logger.error(role);
				logger.error(member);
				return;
			}

			const currentSemesterRoles = member.roles.cache.filter(
				(r) => r.name.startsWith("WiSe") || r.name.startsWith("SoSe")
			);

			for (const currentRole of currentSemesterRoles) {
				await member.roles.remove(currentRole);
			}

			if (role) {
				await member.roles.add(role);
				await interaction.editReply(`Gave you the ${inlineCode(semester)} role.`);
			} else {
				await interaction.editReply(
					`Removed your ${currentSemesterRoles.map((c) => inlineCode(c.name)).join(" ")} role.`
				);
			}
		}
	}
}

export default new RoleSelectMenu();

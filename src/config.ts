import { ColorResolvable, ComponentEmojiResolvable } from "discord.js";

// Configure your bot here.
export const config: BotConfig = {
	// --- General ---
	botName: "IMPA",
	iconURL: "https://raw.githubusercontent.com/StrangeGirlMurph/IMPA/main/images/impa-square.png",
	githubURL: "https://github.com/StrangeGirlMurph/IMPA",
	color: "#F0A5AC",

	// --- Development ---
	logLevel: "debug",

	// --- Management ---
	adminRoleId: "1072340675472920607", // IMP @ HU/roles: admin
	moderatorRoleId: "1078643162559565854", // IMP @ HU/roles: moderator

	// --- Activity Tracker ---
	logActivity: true,

	// --- Roles ---
	pronounRoles: [
		["sie/ihr", "541000113410015245"],
		["er/ihm", "590631286666952704"],
		["they/them", "590660390187302912"],
		["xier/xies", "590660390187302912"],
		["alle Pronomen", null],
		["keine Pronomen", null],
		["frag mich (Pronomen)", null],
	],
	majorRoles: ["IMP", "Informatik", "Mathematik", "Physik", "HU Mitarbeiter*in"],
	semesterRoles: [
		"SoSe 2013",
		"WiSe 2013/14",
		"SoSe 2014",
		"WiSe 2014/15",
		"SoSe 2015",
		"WiSe 2015/16",
		"SoSe 2016",
		"WiSe 2016/17",
		"SoSe 2017",
		"WiSe 2017/18",
		"SoSe 2018",
		"WiSe 2018/19",
		"SoSe 2019",
		"WiSe 2019/20",
		"SoSe 2020",
		"WiSe 2020/21",
		"SoSe 2021",
		"WiSe 2021/22",
		"SoSe 2022",
		"WiSe 2022/23",
		"SoSe 2023",
		"WiSe 2023/24",
		"SoSe 2024",
	],
};

interface BotConfig {
	// --- General ---
	/** Name of the bot. */
	botName: string;
	/** URL to a png or jpg of the logo of the bot. */
	iconURL: string;
	/** URL to the github repository of the bot. Please share your code! */
	githubURL: string;
	/** The main color the bot will use. */
	color: ColorResolvable;

	// --- Development ---
	/** Also available: error, warn, info, http, verbose, debug, silly. */
	logLevel: "debug" | "info" | "warn" | "error" | "verbose";

	// --- Management ---
	/** Moderators of the server (to manage proposals) */
	moderatorRoleId: string;
	/** Admins of the server (to manage the game activity tracker) */
	adminRoleId: string;

	// --- Activity Tracker ---
	/** If User Game Activity should get logged */
	logActivity: boolean;

	// --- Roles ---
	/** Pronoun roles to pick from. First argument is the name of the role, second argument is the emoji id (You get the id by typing "\\[insert emoji]" in Discord). */
	pronounRoles: [string, ComponentEmojiResolvable | null][];
	/** Major roles */
	majorRoles: string[];
	/** Year roles */
	semesterRoles: string[];
}

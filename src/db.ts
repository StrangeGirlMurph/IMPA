import Enmap from "enmap";
import { DateTime, Duration } from "luxon";

// -- LaTeX Database --
export const latexDb = new Enmap<string>("latex"); // key: reply id

// -- Reminder Database --
export const reminderTimeoutCache = new Map<string, NodeJS.Timeout>();
// key: unique id
export const reminderDb = new Enmap<Reminder, InternalReminder>({
	name: "reminder",
	serializer: (data) => ({ ...data, timestamp: data.timestamp.toISO() }),
	deserializer: (data) => ({ ...data, timestamp: DateTime.fromISO(data.timestamp, { setZone: true }) }),
});
export interface Reminder {
	timestamp: DateTime;
	message: string;
	channelID: string;
	user: string;
	ping: string | null;
}

interface InternalReminder {
	timestamp: ISODate;
	message: string;
	channelID: string;
	user: string;
	ping: string | null;
}

// -- Activity Tracker Database --
export const activityTrackerBlacklistDb = new Enmap<string[]>("trackerBlacklist");
activityTrackerBlacklistDb.ensure("general-user", []);
activityTrackerBlacklistDb.ensure("general-game", []);

// key: "[user id]-[game]"
export const activityTrackerLogDb = new Enmap<ActivityLogEntry[], InternalActivityLogEntry[]>({
	name: "trackerLog",
	serializer: (data) => data.map((e) => ({ duration: e.duration.toISO(), date: e.date.toISO() })),
	deserializer: (data) =>
		data.map((e) => ({
			duration: Duration.fromISO(e.duration),
			date: DateTime.fromISO(e.date, { setZone: true }),
		})),
});

export interface ActivityLogEntry {
	duration: Duration;
	date: DateTime;
}

interface InternalActivityLogEntry {
	duration: ISODuration;
	date: ISODate;
}

// -- MISC --
// Types
export type ISODate = string; // ISO Date
export type ISODuration = string; // ISO Duration
export type userID = string; // Discord user id

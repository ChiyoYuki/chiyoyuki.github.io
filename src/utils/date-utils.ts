export function formatDateToYYYYMMDDhhmmss(date: Date): string {
	const nowDate = new Date();
	const diffMinutes = nowDate.getTimezoneOffset();
	const fixedDate = new Date(date.getTime() - diffMinutes * 60000);
	return `${fixedDate.toISOString().substring(0, 10)} ${fixedDate.toISOString().substring(11, 16)}`;
}

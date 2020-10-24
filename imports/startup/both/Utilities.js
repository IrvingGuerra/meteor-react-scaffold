export default {
	currentLocalDate() {
		const date = new Date();
		const offsetMs = date.getTimezoneOffset() * 60 * 1000;
		const msLocal = date.getTime() - offsetMs;
		const dateLocal = new Date(msLocal);
		return dateLocal;
	},
	currentLocalISODate() {
		const date = new Date();
		const offsetMs = date.getTimezoneOffset() * 60 * 1000;
		const msLocal = date.getTime() - offsetMs;
		const dateLocal = new Date(msLocal);
		const iso = dateLocal.toISOString();
		const isoLocal = iso.substring(0, 10);
		return isoLocal;
	}
};

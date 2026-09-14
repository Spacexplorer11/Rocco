export const pebbles = $state({ value: 0 });

/** This only runs during load */
export function load_pebbles() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	let stored = 0;
	try {
		stored = Number(localStorage.getItem("pebbles"));
	} catch (error) {
		console.error("An error occurred fetching the pebbles value from localStorage");
		return;
	}
	if (Number.isNaN(stored) || !Number.isFinite(stored) || stored < 0) {
		pebbles.value = 0;
		console.log("An error occurred with the pebbles value, it was invalid. Resetting to 0.");
	} else {
		pebbles.value = stored;
	}
	console.log("Loaded pebbles:" + pebbles.value);
}

/** @returns {boolean} true if the purchase succeeded, false if insufficient funds */
export function spend_pebbles(cost: number) {
	if (Number.isNaN(cost) || !Number.isFinite(cost) || cost < 0) return false;
	if (pebbles.value >= cost) {
		pebbles.value -= cost;
		return true;
	} else {
		return false;
	}
}

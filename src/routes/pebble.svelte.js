export const pebbles = $state({ value: 0 });

export function load_pebbles() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	const stored = Number(localStorage.getItem("pebbles"));
	if (Number.isNaN(stored) || !Number.isFinite(stored) || stored < 0) {
		pebbles.value = 0;
		console.log("An error occurred with the pebbles value, it was invalid. Resetting to 0.");
	} else {
		pebbles.value = stored;
	}
	console.log("Loaded pebbles:" + pebbles.value);
}

/** @returns {boolean} true if the purchase succeeded, false if insufficient funds */
export function spend_pebbles(cost) {
	if (Number.isNaN(cost) || !Number.isFinite(cost) || cost < 0) return false;
	if (pebbles.value >= cost) {
		pebbles.value -= cost;
		return true;
	} else {
		return false;
	}
}

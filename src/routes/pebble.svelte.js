export const pebbles = $state({ value: 0 });

export function load_pebbles() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	const stored = Number(localStorage.getItem("pebbles"));
	pebbles.value = Number.isNaN(stored) ? 0 : stored;
	console.log("Loaded pebbles:" + pebbles.value);
}

/** @returns {boolean} true if the purchase succeeded, false if insufficient funds */
export function spend_pebbles(cost) {
	if (pebbles.value >= cost) {
		pebbles.value -= cost;
		return true;
	} else {
		pebbles.value = 0;
		return false;
	}
}

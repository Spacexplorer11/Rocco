export const pebbles = $state({ value: 0 });

export async function load_pebbles() {
	if (typeof window === "undefined") return;
	if (typeof localStorage === "undefined") return;
	pebbles.value = Number(localStorage.getItem("pebbles"));
	console.log("pebbles:" + pebbles.value);
	return pebbles;
}

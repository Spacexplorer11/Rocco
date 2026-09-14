import { pebbles } from "./pebble.svelte.js";

export async function load() {
	if (typeof localStorage === "undefined") return;
	if (typeof window === "undefined") return;
	pebbles.value = localStorage.getItem("pebbles");
	console.log("pebbles:" + pebbles.value);
}

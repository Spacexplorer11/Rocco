import { load_pebbles } from "./pebble.svelte.js";
import { load_bought_items, load_equipped_items } from "./items.svelte.ts";

export async function load() {
	load_pebbles();
	load_bought_items();
	load_equipped_items();
}

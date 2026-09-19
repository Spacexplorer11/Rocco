import { load_pebbles } from "./pebble.svelte.js";
import { EquippableItem, items, load_bought_items, load_equipped_items } from "./items.svelte.ts";
import possible_items from "$lib/items/possible_items.json";

export async function load() {
	load_pebbles();
	load_bought_items();
	load_equipped_items();
	for (const item of possible_items) {
		items.possible_items.push(EquippableItem.fromJSON(item));
	}
	console.log(
		`Loaded possible items: [${items.possible_items.map((item) => item.getPrettyStringified()).join(",")}]`
	);
}

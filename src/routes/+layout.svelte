<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { pebbles, load_pebbles, decrease_pebbles } from "$lib/handlers/pebbles.svelte";
	import {
		initImageSupport,
		EquippableItem,
		items,
		load_bought_items,
		load_equipped_items
	} from "$lib/handlers/items.svelte";
	import { onMount } from "svelte";
	import possible_items from "$lib/items/possible_items.json";
	import { decrease_affection, decrease_nutrition, rock } from "$lib/handlers/rock.svelte";

	let { children } = $props();

	$effect(() => {
		if (typeof window === "undefined") return;
		if (typeof localStorage === "undefined") return;
		try {
			localStorage.setItem("pebbles", String(pebbles.value));
			console.log("Successfully saved pebbles as ", pebbles.value);
		} catch (error) {
			console.error("An error occurred when saving the pebbles value: ", error);
		}
	});

	$effect(() => {
		if (typeof window === "undefined") return;
		if (typeof localStorage === "undefined") return;
		try {
			localStorage.setItem("bought_items", JSON.stringify(items.bought_items));
			console.log(
				`Saved bought items: [${items.bought_items.map((item) => item.getPrettyStringified()).join(",")}]`
			);
		} catch (error) {
			console.error("An error occurred when saving the bought items: ", error);
		}
	});

	$effect(() => {
		if (typeof window === "undefined") return;
		if (typeof localStorage === "undefined") return;
		try {
			localStorage.setItem("equipped_items", JSON.stringify(items.equipped_items));
			console.log(
				`Saved equipped items: [${items.equipped_items.map((item) => item.getPrettyStringified()).join(",")}]`
			);
		} catch (error) {
			console.error("An error occurred when saving the equipped items: ", error);
		}
	});

	$effect(() => {
		rock.happiness.total = (rock.happiness.affection + rock.happiness.nutrition) / 2;
	});

	setInterval(decrease_affection, 15000);
	setInterval(decrease_nutrition, 25000);
	setInterval(decrease_pebbles, 30000);

	onMount(async () => {
		load_pebbles();
		load_bought_items();
		load_equipped_items();
		for (const item of possible_items) {
			let parsed_item = EquippableItem.fromJSON(item);
			if (items.possible_items.includes(parsed_item)) continue;
			items.possible_items.push(parsed_item);
		}
		console.log(
			`Loaded possible items: [${items.possible_items.map((item) => item.getPrettyStringified()).join(",")}]`
		);
		await initImageSupport();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div id="national-park">
	{@render children()}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap");

	#national-park {
		font-family: "National Park", sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: oblique;
	}
</style>

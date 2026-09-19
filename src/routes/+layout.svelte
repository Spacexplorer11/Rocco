<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { pebbles } from "./pebble.svelte.ts";
	import { initImageSupport, items } from "./items.svelte.ts";
	import { onMount } from "svelte";

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

	onMount(async () => {
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

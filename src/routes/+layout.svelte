<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { pebbles } from "./pebble.svelte.ts";
	import { initImageSupport } from "./items.svelte.ts";
	import { onMount } from "svelte";

	let { children } = $props();

	$effect(() => {
		if (typeof window === "undefined") return;
		if (typeof localStorage === "undefined") return;
		try {
			localStorage.setItem("pebbles", String(pebbles.value));
			console.log("Successfully saved pebbles as ", pebbles.value);
		} catch (error) {
			console.error("An error occurred when saving the pebbles value");
		}
	});

	onMount(async () => {
		await initImageSupport();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

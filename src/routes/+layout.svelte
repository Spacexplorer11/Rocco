<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { pebbles } from "./pebble.svelte.ts";

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
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}


<style>
    @import url("https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap");

    .national-park {
        font-family: "National Park", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: oblique;
    }
</style>
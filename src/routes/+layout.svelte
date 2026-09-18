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
            console.error("An error occurred when saving the bought_items: ", error);
        }
    });

	onMount(async () => {
		await initImageSupport();
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}

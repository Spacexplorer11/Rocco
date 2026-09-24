<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import { pebbles, load_pebbles, increase_pebbles } from "$lib/handlers/pebbles.svelte";
	import { EquippableItem, items, load_bought_items, load_equipped_items } from "$lib/handlers/items.svelte";
	import { onMount } from "svelte";
	import possible_items from "$lib/items/possible_items.json";
	import { decrease_affection, decrease_nutrition, load_rock, rock, save_rock } from "$lib/handlers/rock.svelte";
	import background from "$lib/assets/background.png?enhanced";

	let { children } = $props();

	onMount(() => {
		load_rock();
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
		const affectionInterval = setInterval(decrease_affection, 5000);
		const nutritionInterval = setInterval(decrease_nutrition, 7500);
		const pebblesInterval = setInterval(increase_pebbles, 20000);
		$effect(() => {
			try {
				localStorage.setItem("pebbles", String(pebbles.value));
				console.log("Successfully saved pebbles as ", $state.snapshot(pebbles.value));
			} catch (error) {
				console.error("An error occurred when saving the pebbles value: ", error);
			}
		});

		$effect(() => {
			try {
				localStorage.setItem("bought_items", JSON.stringify(items.bought_items));
				console.log(
					`Saved bought items: [${$state.snapshot(items.bought_items.map((item) => item.getPrettyStringified()).join(","))}]`
				);
			} catch (error) {
				console.error("An error occurred when saving the bought items: ", error);
			}
		});

		$effect(() => {
			try {
				localStorage.setItem("equipped_items", JSON.stringify(items.equipped_items));
				console.log(
					`Saved equipped items: [${$state.snapshot(items.equipped_items.map((item) => item.getPrettyStringified()).join(","))}]`
				);
			} catch (error) {
				console.error("An error occurred when saving the equipped items: ", error);
			}
		});

		$effect(() => {
			rock.happiness.total = (rock.happiness.affection + rock.happiness.nutrition) / 2;
		});

		$effect(() => {
			save_rock();
		});
		return () => {
			clearInterval(affectionInterval);
			clearInterval(nutritionInterval);
			clearInterval(pebblesInterval);
		};
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div id="national-park">
	<enhanced:img src={background} alt="" id="background" sizes="100vw" />
	{@render children()}
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap");

	#national-park {
		font-family: "National Park", sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
	}

	#background {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: -1;
	}

	:global(html),
	:global(body) {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		margin: 0;
		box-sizing: border-box;
		overflow-x: hidden;
		padding: 0;
		height: 100%;
		width: 100%;
		overscroll-behavior: none;
	}
</style>

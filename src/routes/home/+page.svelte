<script lang="ts">
	import { load_rock, rock } from "#lib/handlers/rock.svelte.js";
	import { goto } from "$app/navigation";
	import { pebbles } from "#lib/handlers/pebbles.svelte.ts";
	import { onMount } from "svelte";
	import { happy_rocco, sad_rocco, angry_rocco } from "#lib/assets/rocco/index.js";
	import symbol_of_nutrition from "#lib/assets/symbols/nutrition.png?enhanced";
	import { Settings, ShelvingUnit, Store } from "@lucide/svelte";
	import type { Picture } from "@sveltejs/enhanced-img";
	import foodicon from "#lib/assets/symbols/food-icon.png?enhanced";
	import restaurant from "#lib/assets/symbols/restaurant.png?enhanced";

	const affectionModules = import.meta.glob("#lib/assets/symbols/affection-frames/*.png", {
		eager: true,
		import: "default",
		query: {
			enhanced: true
		}
	});

	const affectionFrames = Object.entries(affectionModules)
		.sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
		.map(([, picture]) => picture as Picture);

	let affectionFrameIndex = $derived(
		Math.min(
			affectionFrames.length - 1,
			Math.floor((affectionFrames.length - 1) * (1 - rock.happiness.affection / 100))
		)
	);

	const happinessModules = import.meta.glob("#lib/assets/symbols/happiness-frames/*.png", {
		eager: true,
		import: "default",
		query: {
			enhanced: true
		}
	});

	const happinessFrames = Object.entries(happinessModules)
		.sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
		.map(([, picture]) => picture as Picture);

	let happinessFrameIndex = $derived.by(() => {
		if (rock.happiness.total <= 0) {
			return 11;
		}
		if (rock.happiness.total > 90) {
			return Math.min(9, Math.round(100 - rock.happiness.total));
		}
		return 10;
	});

	let rocco_state = $derived.by(() => {
		if (rock.happiness.total > 95) {
			return happy_rocco;
		} else if (rock.happiness.total > 0 && rock.happiness.total <= 95) {
			return sad_rocco;
		} else {
			return angry_rocco;
		}
	});

	onMount(() => {
		load_rock();
		if (rock.name.trim().length === 0) {
			goto("/");
		}
	});
</script>

<svelte:head>
	<title>Rocco - Homepage - Keep your rock happy!</title>
	<meta
		name="description"
		content="Feed or pet your rock to keep it happy and earn a pebble every 20s its more than 95% happy!"
	/>
</svelte:head>

<header>
	<h1 class=" flex flex-row justify-center text-center text-4xl text-black">{rock.name} - {pebbles.value} pebbles</h1>
	<div class="flex flex-row justify-between">
		<div class="flex w-full flex-col items-center">
			<span class="mb-2 flex flex-row text-center text-3xl text-yellow-400">
				<enhanced:img
					src={happinessFrames[happinessFrameIndex]}
					alt="happiness symbol"
					class="mr-2 h-9 w-9"
					style="image-rendering: pixelated;"
					sizes="36px"
				/>Happiness = {rock.happiness.total}</span
			>
			<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
				<div class="h-full bg-yellow-400" style="width: {rock.happiness.total}%;"></div>
			</div>
		</div>
		<div class="flex w-full flex-col items-center">
			<span class="mb-2 flex flex-row text-center text-3xl text-pink-600"
				><enhanced:img
					src={affectionFrames[affectionFrameIndex]}
					alt="heart symbol"
					class="h-9 w-9"
					style="image-rendering: pixelated;"
					sizes="36px"
				/>Affection = {rock.happiness.affection}</span
			>
			<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
				<div class="h-full bg-pink-600" style="width: {rock.happiness.affection}%;"></div>
			</div>
			<p class="text-center text-3xl whitespace-normal">Click on the rock to pet it</p>
		</div>
		<div class="flex w-full flex-col items-center">
			<span class="mb-2 flex flex-row text-center text-3xl text-blue-500"
				><enhanced:img
					src={symbol_of_nutrition}
					alt="knife & fork symbol"
					class="h-9 w-9"
					style="image-rendering: pixelated;"
					sizes="36px"
				/>Nutrition = {rock.happiness.nutrition}</span
			>
			<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
				<div class="h-full bg-blue-500" style="width: {rock.happiness.nutrition}%;"></div>
			</div>
			<button
				class=" flex max-w-fit flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-3xl"
				onclick={() => {
					if (rock.happiness.nutrition < 100) {
						rock.happiness.nutrition += 1;
					}
				}}
				><enhanced:img
					src={foodicon}
					alt="strawberry"
					class="h-9 w-9 mr-1"
					style="image-rendering: pixelated;"
					sizes="36px"
				/>Food</button
			>
		</div>
	</div>
</header>

<button
	class="m-10 mx-auto mt-40 flex flex-row justify-center whitespace-normal"
	onclick={() => {
		if (rock.happiness.affection < 100) {
			rock.happiness.affection += 1;
		}
	}}
	aria-label="Rocco"
>
	<enhanced:img alt="Rocco!" src={rocco_state} sizes="min(1536px, 100vw)" />
</button>

<nav class="mt-25 flex flex-row justify-between">
	<button
		class="mb-auto ml-[1vw] flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		onclick={() => goto("/inventory")}><ShelvingUnit class="mr-1" />Inventory</button
	>
	<button
		class="mb-auto flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-center"
		onclick={() => goto("/shop")}><Store class="mr-1" />Shop</button
	>
	<button
		class="mb-auto flex flex-row rounded-4xl bg-linear-to-l from-[#63A46C] to-[#16DB93] p-5 text-right"
		onclick={() => goto("/settings")}><Settings class="mr-1" />Settings</button
	>
	<button
		class="mr-[1vw] mb-auto flex flex-row rounded-4xl bg-linear-to-l from-[#63A46C] to-[#16DB93] p-5 text-right"
		onclick={() => goto("/restaurant")}
	>
		<enhanced:img
			src={restaurant}
			alt="cheese"
			class="h-9 w-9 mr-1"
			style="image-rendering: pixelated;"
			sizes="36px"
		/>Restaurant
	</button>
</nav>

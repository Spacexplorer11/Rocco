<script lang="ts">
	import { pebbles } from "#lib/handlers/pebbles.svelte.js";
	import { items } from "#lib/handlers/items.svelte.js";
	import { load_rock, rock } from "#lib/handlers/rock.svelte.js";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { Undo2 } from "@lucide/svelte";
	import { EquippableItem } from "#lib/handlers/items.svelte.ts";
	import type { Picture } from "@sveltejs/enhanced-img";
	const itemModules = import.meta.glob("#lib/assets/items/*.png", {
		eager: true,
		import: "default",
		query: {
			enhanced: true
		}
	});

	const itemImages = new Map(
		Object.entries(itemModules).map(([url, picture]) => [url.split("/").pop()!.replace(".png", ""), picture as Picture])
	);

	onMount(() => {
		load_rock();
		if (rock.name.trim().length === 0) {
			goto("/");
		}
		for (const item of items.possible_items) {
			const element = document.getElementById(item.id) as HTMLButtonElement;
			if (element === null) {
				console.error(`Oi! Your code is broken - somehow the shop element with id ${item.id} doesn't exist??`);
				continue;
			}
			if (items.bought_items.includes(item) || pebbles.value < item.price) {
				element.disabled = true;
			}
		}
	});
</script>

<svelte:head>
	<title>Rocco - Shop - Buy a plethora of cool items for your rock!</title>
	<meta
		name="description"
		content="View our extensive catalogue to find loads of cool looking hand-drawn items for your rock to wear!"
	/>
</svelte:head>

<header class="mb-10 flex flex-row">
	<button
		class="left-3 flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		onclick={() => goto("/home")}><Undo2 class="mr-1" />Back</button
	>
	<h1 class="mx-auto text-center text-5xl text-black">Shop: You have {pebbles.value} pebbles</h1>
</header>

<main class="m-2 grid grid-cols-3 gap-3">
	{#each items.possible_items as item (item.id)}
		<div class="@container my-4 flex flex-col items-center">
			<h2 class="text-center text-3xl text-black">{item.name} - {item.price} pebbles</h2>
			<enhanced:img
				class="m-10 mx-auto mt-20 justify-center whitespace-normal"
				alt={item.name}
				title={item.name}
				src={itemImages.get(item.id)!}
				sizes="30vw"
			/>
			<button
				class="mx-auto justify-center rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-4 text-center disabled:cursor-not-allowed disabled:bg-gray-400"
				id={item.id}
				title="Buy {item.name} for {item.price} pebbles"
				disabled={EquippableItem.includes(items.bought_items, item) || pebbles.value < item.price}
				onclick={() => {
					if (pebbles.value >= item.price) {
						pebbles.value -= item.price;
						items.bought_items.push(item);
						console.log(`Bought ${item.name}`);
					}
				}}
			>
				{EquippableItem.includes(items.bought_items, item)
					? "You already have this!"
					: pebbles.value >= item.price
						? "Buy Now!"
						: "Can't afford this!"}
			</button>
		</div>
	{/each}
</main>

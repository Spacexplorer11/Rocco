<script lang="ts">
	import { pebbles } from "$lib/handlers/pebbles.svelte";
	import { items } from "$lib/handlers/items.svelte";
	import { load_rock, rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

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

<header class="mb-10 flex flex-row">
	<button
		class="left-3 rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		onclick={() => goto("/home")}>Back</button
	>
	<h1 class="mx-auto text-center text-5xl text-black">Shop: You have {pebbles.value} pebbles</h1>
</header>

<main class="m-2 grid grid-cols-3 gap-3">
	{#each items.possible_items as item (item.id)}
		<div class="@container flex flex-col">
			<h2 class="text-center text-3xl text-black">{item.name} - {item.price} pebbles</h2>
			<img
				class="m-10 mx-auto mt-40 justify-center whitespace-normal"
				alt={item.name}
				title={item.name}
				src={item.asset_path}
			/>
			<button
				class="mx-auto justify-center rounded-4xl p-4 text-center active:bg-linear-to-r active:from-[#63A46C] active:to-[#16DB93] disabled:cursor-not-allowed disabled:bg-gray-400"
				id={item.id}
				title="Buy {item.name} for {item.price} pebbles"
				disabled={items.bought_items.includes(item) || pebbles.value < item.price}
				onclick={() => {
					if (pebbles.value >= item.price) {
						pebbles.value -= item.price;
						items.bought_items.push(item);
						console.log(`Bought ${item.name}`);
					}
				}}
			>
				{items.bought_items.includes(item)
					? "You already have this!"
					: pebbles.value >= item.price
						? "Buy Now!"
						: "Can't afford this!"}
			</button>
		</div>
	{/each}
</main>

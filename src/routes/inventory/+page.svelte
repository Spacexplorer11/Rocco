<script lang="ts">
	import { EquippableItem, items } from "#lib/handlers/items.svelte.ts";
	import { goto } from "$app/navigation";
	import { Undo2 } from "@lucide/svelte";
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

	console.log([...itemImages.keys()]);
</script>

<svelte:head>
	<title>Rocco - Inventory - View everything you own</title>
	<meta name="description" content="View every item you own and equip/unequip it!" />
</svelte:head>

<header class="mb-10 flex flex-row">
	<button
		class="left-3 flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		onclick={() => goto("/home")}><Undo2 class="mr-1" />Back</button
	>
	<h1 class="mx-auto text-center text-5xl text-black">Inventory</h1>
</header>
<main class="m-2 grid grid-cols-3 gap-3">
	{#each items.bought_items as item}
		<div class="@container flex flex-col">
			<h2 class="text-center text-3xl text-black">
				{item.name}{EquippableItem.includes(items.equipped_items, item) ? " - Equipped" : ""}
			</h2>
			<enhanced:img
				class="m-10 mx-auto mt-40 justify-center whitespace-normal"
				alt={item.name}
				title={item.name}
				src={itemImages.get(item.id)!}
			/>
			<button
				class="mx-auto justify-center rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-4 text-center"
				id={item.id}
				title="{EquippableItem.includes(items.equipped_items, item) ? 'Unequip' : 'Equip'} {item.name}"
				onclick={() => {
					if (EquippableItem.includes(items.equipped_items, item)) {
						items.equipped_items = items.equipped_items.filter((value) => value.id !== item.id);
					} else {
						items.equipped_items.push(item);
					}
				}}
			>
				{EquippableItem.includes(items.equipped_items, item) ? "Unequip" : "Equip"}
			</button>
		</div>
	{:else}
		<h3 class="absolute top-[50vh] left-[23vw] text-center text-3xl text-black">
			You haven't got any items yet, go to the <a href="/shop" class="text-yellow-500 underline">shop</a> to get some!
		</h3>
	{/each}
</main>

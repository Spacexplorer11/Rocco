<script lang="ts">
	import { EquippableItem, items, Slot } from "#lib/handlers/items.svelte.ts";
	import type { Picture } from "@sveltejs/enhanced-img";
	import { Back } from "#lib";

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
	<Back />
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
				sizes="30vw"
			/>
			<button
				class="mx-auto justify-center rounded-4xl p-4 text-center not-disabled:bg-linear-to-r not-disabled:from-[#63A46C] not-disabled:to-[#16DB93] disabled:cursor-not-allowed disabled:bg-gray-400"
				title={EquippableItem.includes(items.equipped_items, item)
					? `Click to unequip ${item.name}`
					: EquippableItem.includes_same_slot_type(items.equipped_items, item)
						? `You can't equip this ${item.name}, you already have another item on your rock's ${item.slot === Slot.Head ? "head" : ""}`
						: `Click to equip ${item.name}`}
				disabled={EquippableItem.includes_same_slot_type(items.equipped_items, item)}
				onclick={() => {
					if (EquippableItem.includes(items.equipped_items, item)) {
						items.equipped_items = items.equipped_items.filter((value) => value.id !== item.id);
					} else {
						items.equipped_items.push(item);
					}
				}}
			>
				{EquippableItem.includes(items.equipped_items, item)
					? "Unequip"
					: EquippableItem.includes_same_slot_type(items.equipped_items, item)
						? `You already have another item on your rock's ${item.slot === Slot.Head ? "head" : ""}`
						: "Equip"}
			</button>
		</div>
	{:else}
		<h3 class="absolute top-[50vh] left-[23vw] text-center text-3xl text-black">
			You haven't got any items yet, go to the <a href="/shop" class="text-yellow-500 underline">shop</a> to get some!
		</h3>
	{/each}
</main>

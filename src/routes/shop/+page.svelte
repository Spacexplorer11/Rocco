<script lang="ts">
	import { pebbles } from "$lib/handlers/pebbles.svelte";
	import { items } from "$lib/handlers/items.svelte";
	import { load_rock, rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	const itemImages = import.meta.glob("/src/lib/images/items/*.png", { eager: true, import: "default" }) as Record<
		string,
		string
	>;

	export function getItemImage(assetPath: string): string {
		const url = itemImages[assetPath];
		if (!url) {
			console.error(`No image found for asset_path: ${assetPath}`);
			return ""; // or a fallback placeholder image
		}
		return url;
	}

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

<h1 class="text-center text-5xl text-black">Shop: You have {pebbles.value} pebbles</h1>

<button
	class="mt-25 mr-[83vw] ml-[1vw] rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
	onclick={() => goto("/home")}>Back</button
>

{#each items.possible_items as item (item.id)}
	<h2 class="text-center text-3xl text-black">{item.name} - {item.price} pebbles</h2>
	<img
		class="m-10 mx-auto mt-40 flex flex-row justify-center whitespace-normal"
		alt={item.name}
		title={item.name}
		src={item.asset_path}
	/>
	<button
		class="mx-auto bg-linear-to-r from-[#63A46C] to-[#16DB93]"
		id={item.id}
		title="Buy {item.name} for {item.price} pebbles"
		onclick={() => {
			if (pebbles.value >= item.price) {
				pebbles.value -= item.price;
				items.bought_items.push(item);
			}
		}}
	>
		{pebbles.value >= item.price ? "Buy Now!" : "Can't afford it!"}
	</button>
{/each}

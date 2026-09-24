<script lang="ts">
	import { load_rock, rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	import { pebbles } from "$lib/handlers/pebbles.svelte.ts";
	import { onMount } from "svelte";
	import rocco from "$lib/assets/rocco.png?enhanced";
	import { Settings, ShelvingUnit, Store } from "@lucide/svelte";

	onMount(() => {
		load_rock();
		if (rock.name.trim().length === 0) {
			goto("/");
		}
	});
</script>

<header>
	<h1 class=" flex flex-row justify-center text-center text-4xl text-black">{rock.name} - {pebbles.value} pebbles</h1>
	<div class="flex flex-row justify-between">
		<div class="flex w-full flex-col items-center">
			<span class="mb-2 text-center text-3xl text-yellow-400">Happiness = {rock.happiness.total}</span>
			<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
				<div class="h-full bg-yellow-400" style="width: {rock.happiness.total}%;"></div>
			</div>
		</div>
		<div class="flex w-full flex-col items-center">
			<span class="mb-2 text-center text-3xl text-pink-600">Affection = {rock.happiness.affection}</span>
			<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
				<div class="h-full bg-pink-600" style="width: {rock.happiness.affection}%;"></div>
			</div>
			<p class="text-center text-3xl whitespace-normal">Click on the rock to pet it</p>
		</div>
		<div class="flex w-full flex-col items-center">
			<span class="mb-2 text-center text-3xl text-blue-500">Nutrition = {rock.happiness.nutrition}</span>
			<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
				<div class="h-full bg-blue-500" style="width: {rock.happiness.nutrition}%;"></div>
			</div>
			<button
				class="max-w-fit rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-3xl"
				onclick={() => {
					if (rock.happiness.nutrition < 100) {
						rock.happiness.nutrition += 1;
					}
				}}>Food</button
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
	<enhanced:img alt="Rocco!" src={rocco} />
</button>

<nav class="mt-25 flex flex-row justify-between">
	<button
		class=" ml-[1vw] flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		onclick={() => goto("/shop")}><ShelvingUnit class="mr-1" />Inventory</button
	>
	<button
		class=" flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-center"
		onclick={() => goto("/shop")}><Store class="mr-1" />Shop</button
	>
	<button
		class="mr-[1vw] mb-auto flex flex-row rounded-4xl bg-linear-to-l from-[#63A46C] to-[#16DB93] p-5 text-right"
		onclick={() => goto("/settings")}><Settings class="mr-1" />Settings</button
	>
</nav>

<script>
	import { rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	import { pebbles } from "$lib/handlers/pebbles.svelte.ts";
</script>

<h1 class="flex flex-row justify-center text-center text-4xl whitespace-normal text-black">{rock.name}</h1>
<div class="flex flex-row justify-between">
	<div class="flex w-full flex-col items-center justify-center">
		<span class="mb-2 text-3xl text-yellow-400">Happiness = {rock.happiness.total}</span>
		<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
			<div class="h-full bg-yellow-400" style="width: {rock.happiness.total}%;"></div>
		</div>
	</div>
	<div class="flex w-full flex-col items-center justify-center">
		<span class="mb-2 text-3xl text-pink-600">Affection = {rock.happiness.affection}</span>
		<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
			<div class="h-full bg-pink-600" style="width: {rock.happiness.affection}%;"></div>
		</div>
	</div>
	<div class="flex w-full flex-col items-center justify-center">
		<span class="mb-2 text-3xl text-blue-500">Nutrition = {rock.happiness.nutrition}</span>
		<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
			<div class="h-full bg-blue-500" style="width: {rock.happiness.nutrition}%;"></div>
		</div>
	</div>
</div>
<p class="ml-156 flex flex-row text-center text-3xl whitespace-normal">Click on the rock to pet it</p>

<button
	class="justify-right ml-325 rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-right text-3xl"
	onclick={() => {
		if (rock.happiness.nutrition < 100) {
			rock.happiness.nutrition += 1;
		}
	}}>Food</button
>

<button
	class="m-10 mx-auto mt-40 flex flex-row justify-center whitespace-normal"
	onclick={() => {
		if (rock.happiness.affection < 100) {
			rock.happiness.affection += 1;
		}
	}}
>
	<img alt="Rocco!" src="images/rocco.png" />
</button>

<div class="flex flex-row">
	<button
		class="mt-25 mr-[37vw] ml-[1vw] rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		onclick={() => goto("/shop")}
		>Go to shop
	</button>
	<button
		class="mt-25 mr-[37vw] mb-auto ml-[1vw] rounded-4xl bg-linear-to-l from-[#63A46C] to-[#16DB93] p-5 text-center"
		>Pebbles:{pebbles.value}
	</button>
	<button
		class="mt-25 mb-auto ml-[1vw] rounded-4xl bg-linear-to-l from-[#63A46C] to-[#16DB93] p-5 text-right"
		onclick={() => goto("/settings")}
		>Settings
	</button>
</div>

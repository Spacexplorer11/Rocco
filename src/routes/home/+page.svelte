<script>
	let happy = $state(12);
	import { rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	let affection = $state(66);
	let nutrition = $state(25);
</script>

<h1 class=" flex flex-row justify-center text-center text-4xl text-black">{rock.name}</h1>
<div class="flex flex-row justify-between">
	<div class="flex w-full flex-col items-center justify-center">
		<span class="mb-2 text-3xl text-yellow-400">Happiness - {happy}</span>
		<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
			<div class="h-full bg-yellow-400" style="width: {happy}%;"></div>
		</div>
	</div>
	<div class="flex w-full flex-col items-center justify-center">
		<span class="mb-2 text-3xl text-pink-600">Affection - {affection}</span>
		<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
			<div class="h-full bg-pink-600" style="width: {affection}%;"></div>
		</div>
	</div>
	<div class="flex w-full flex-col items-center justify-center">
		<span class="mb-2 text-3xl text-blue-500">Nutrition - {nutrition}</span>
		<div class="h-4 w-full max-w-md overflow-hidden rounded-full border-2">
			<div class="h-full bg-blue-500" style="width: {nutrition}%;"></div>
		</div>
	</div>
</div>

<button class="m-10 mx-auto mt-60 flex flex-row justify-center whitespace-normal">
	<img alt="Rocco!" src="images/rocco.png" />
</button>
<div class="flex flex-row">
	<button
		class="mt-52 mr-[84vw] ml-[1vw] rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		>Go to shop</button
	>
	<button
		class="mt-52 mb-auto ml-[1vw] rounded-4xl bg-linear-to-l from-[#63A46C] to-[#16DB93] p-5 text-right"
		onclick={() => goto("/settings")}>Settings</button
	>
</div>

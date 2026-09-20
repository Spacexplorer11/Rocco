<script>
	import { rock } from "./rock.svelte.ts";
	import { goto } from "$app/navigation";
</script>

<h1 class="text-center text-5xl text-gray-700">Rocco</h1>
<h2 class="text-center text-3xl text-amber-900">Your little friend that rocks!</h2>

<h3 class="p-40 text-center text-4xl text-white hover:animate-pulse">
	Welcome to Rocco! What would you like to name your pet rock?
</h3>

<div class=" mx-auto flex flex-col items-center justify-center text-center">
	<input
		maxlength="30"
		class=" mx-auto rounded-4xl fill-black text-white disabled:cursor-not-allowed"
	/>
	<input
		maxlength="30"
		class=" mx-auto rounded-4xl fill-black text-white disabled:cursor-not-allowed"
		id="rock-name-input"
		bind:value={rock.name}
	/>
	<label for="rock-name-input" class="text-center text-2xl text-amber-600"
		>Note - rock name cannot be longer than 30 characters and cannot be blank</label
	>

	{#if rock.name.trim().length > 0}
		<button
			class="m-20 bg-linear-to-r from-[#63A46C] to-[#16DB93] text-center text-2xl text-green-500"
			onclick={() => goto("/home")}>Confirm?</button
		>
	{/if}
</div>

<style>
	input {
		width: 100%;
		max-width: 750px;
		padding: 20px 20px;
		font-size: 1rem;
		border: 2px solid #2d848a;
		border-radius: 99999px;
		outline: #267071 solid 2px;
		background: #27812a;
	}
</style>

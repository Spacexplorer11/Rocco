<script>
	import { load_rock, rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { CircleCheckBig } from "@lucide/svelte";

	onMount(() => {
		load_rock();
		if (rock.name.trim().length > 0) {
			goto("/home");
		}
	});
</script>

<header>
	<h1 class="text-center text-5xl text-gray-700">Rocco</h1>
	<h2 class="text-center text-3xl text-amber-900">Your little friend that rocks!</h2>
</header>

<main>
	<h3 class="p-40 text-center text-4xl text-white hover:animate-pulse">
		Welcome to Rocco! What would you like to name your pet rock?
	</h3>

	<div class=" mx-auto flex flex-col items-center justify-center text-center">
		<input
			maxlength="30"
			class=" mx-auto rounded-4xl fill-green-500 text-white disabled:cursor-not-allowed"
			id="rock-name-input"
			bind:value={rock.name}
		/>
		<label for="rock-name-input" class="mt-4 rounded-2xl bg-gray-500 p-3 text-center text-2xl text-black"
			>Note - your rock name cannot be longer than <strong>30 characters</strong> and cannot be blank</label
		>

		{#if rock.name.trim().length > 0}
			<button
				class="m-20 flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-center text-2xl text-blue-800"
				onclick={() => {
					rock.happiness.total = 100;
					rock.happiness.affection = 100;
					rock.happiness.nutrition = 100;
					goto("/home");
				}}>Confirm? <CircleCheckBig class="my-1.5 ml-2 text-center" /></button
			>
		{/if}
	</div>
</main>

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

<script>
	import { pebbles } from "$lib/handlers/pebbles.svelte";
	import { load_rock, rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	onMount(() => {
		load_rock();
		if (rock.name.trim().length === 0) {
			goto("/");
		}
	});
</script>

<h1 class="text-center text-5xl text-black">Shop: You have {pebbles.value} pebbles</h1>

<button
	class="mt-25 mr-[83vw] ml-[1vw] rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
	onclick={() => goto("/home")}>Back</button
>

<button
	class="m-10 mx-auto mt-40 flex flex-row justify-center whitespace-normal"
	onclick={() => {
		if (pebbles.value > 5) {
			pebbles.value -= 5;
		}
	}}
	aria-label="Top Hat"
>
	<enhanced:img alt="Top Hat" src="$lib/images/top-hat.png" />
</button>
<p class="text-center text-3xl text-black">Top Hat - 30 pebbles</p>

<script>
	import { pebbles } from "$lib/handlers/pebbles.svelte";
	import { goto } from "$app/navigation";
</script>

<h1 class="text-center text-5xl text-black">Shop: You have {pebbles.value} pebbles</h1>

<button
	class="mt-25 mr-[83vw] ml-[1vw] rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
	onclick={() => goto("/home")}>Back</button
>

<button class="m-10 mx-auto mt-40 flex flex-row justify-center whitespace-normal">
	<img
		alt="Top Hat"
		src="images/top-hat.png"
		onclick={() => {
			if (pebbles.value > 5) {
				pebbles.value -= 5;
			}
		}}
	/>
</button>
<p class="text-center text-3xl text-black">Top Hat - 5 pebbles</p>

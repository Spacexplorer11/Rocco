<script>
	import { load_rock, rock } from "#lib/handlers/rock.svelte.js";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { Back } from "#lib";

	onMount(() => {
		load_rock();
		if (rock.name.trim().length === 0) {
			goto("/");
		}
	});
</script>

<svelte:head>
	<title>Rocco - Settings - Customise your experience in Rocco</title>
	<meta name="description" content="Customise your experience in Rocco! (More features coming soon!)" />
</svelte:head>

<nav class="mb-10 flex flex-row">
	<Back />
</nav>

<div class="text-center">
	<button
		class="mx-auto mt-70 justify-center rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-10 text-center text-9xl text-yellow-500"
		onclick={() => {
			rock.name = "";
			goto("/");
		}}>Change Name?</button
	>
</div>

<script>
	import { load_rock, rock } from "$lib/handlers/rock.svelte";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { Undo2 } from '@lucide/svelte';

	onMount(() => {
		load_rock();
		if (rock.name.trim().length === 0) {
			goto("/");
		}
	});
</script>

<nav class="mb-10 flex flex-row">
	<button
		class="flex flex-row left-3 rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
		onclick={() => goto("/home")}><Undo2 />Back</button
	>
</nav>

<div class="text-center">
<button
	class="mt-70 mx-auto justify-center rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-10 text-center text-9xl text-yellow-500"
	onclick={() => {
		rock.name = "";
		goto("/");
	}}>Change Name?</button
>
</div>

<script>
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

<button
	class="mt-70 ml-75 justify-center rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-6 text-center text-9xl text-green-500"
	onclick={() => {
		rock.name = "";
		goto("/");
	}}>Change Name?</button
>

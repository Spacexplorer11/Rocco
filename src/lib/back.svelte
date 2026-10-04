<script>
	import { goto } from "$app/navigation";
	import { Undo2 } from "@lucide/svelte";
</script>

<button
	class="left-3 flex flex-row rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
	onclick={() => goto("/home")}><Undo2 class="mr-1" />Back</button
>

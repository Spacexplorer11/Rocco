<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}


<style>
    @import url("https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap");

    .national-park {
        font-family: "National Park", sans-serif;
        font-optical-sizing: auto;
        font-weight: 600;
        font-style: oblique;
    }
</style>
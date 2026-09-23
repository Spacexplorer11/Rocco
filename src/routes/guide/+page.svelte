<script>
	import { goto } from "$app/navigation";
</script>

<h1 class="text-center text-5xl text-black">Welcome to Rocco, a pet rock simulator</h1>
<p class="p-20 text-center text-4xl text-black">
	A pet rock simulator where you must take care of your rock by petting it and feeding it to keep it happy! <br />
	<br /> <br />
	You can do this by: <br /> <br />
	1.Feed your rock by clicking on the "Food" button to gain 1 nutrition point <br />
	2.Click your rock to pet it to gain 1 affection point <br />
	3.Keep your rock's happiness above 95 for 20 seconds to get a pebble! <br />
	4.Spend your pebbles in the shop to buy your rock cool accessories
</p>

<button
	class="mt-25 mr-[83vw] ml-[1vw] rounded-4xl bg-linear-to-r from-[#63A46C] to-[#16DB93] p-5 text-left"
	onclick={() => goto("/")}>Go back</button
>

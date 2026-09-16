<script>
    let Name = $state("");
</script>
<h1 class="text-center text-5xl text-gray-700">
    Rocco
</h1>
<h2 class="text-center text-3xl text-amber-900">
    Your little friend that rocks!
</h2>
<p>
    .
</p>
<h3 class="text-center text-4xl text-white hover:animate-pulse p-40">Welcome to Rocco! What would you like to name your pet rock?</h3>

<input class=" mx-auto text-gray-600 fill-black disabled:cursor-not-allowed rounded-4xl"
        bind:value={Name} />

<style>
    main {
        width: 100%;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100dvh;
        padding: 20px;
        box-sizing: border-box;
    }

    input {
        width: 100%;
        max-width: 750px;
        padding: 20px 20px;
        font-size: 1rem;
        border: 2px solid #2D848A;
        border-radius: 99999px;
        outline: #267071 solid 2px;
        background: #27812a;
    }
    </style>
<div class=" mx-auto flex flex-col justify-center items-center text-center">
    <button class="mx-auto text-center inline-block max-w-fit whitespace-normal my-1 text-3xl text-green-900 bg-linear-to-r from-[#2D848A] to-[#267071] p-[0.5em] rounded-4xl">
        Confirm?
    </button>
</div>
<script lang="ts">
	import '@fontsource-variable/source-serif-4/index.css';
	import '@fontsource-variable/inter/index.css';
	import './global.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="oklch(97.5% 0.008 80)" />
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	main {
		width: var(--measure);
		margin: 0 auto;
		padding: clamp(2rem, 5vw, 4rem) 0 6rem;
	}
</style>

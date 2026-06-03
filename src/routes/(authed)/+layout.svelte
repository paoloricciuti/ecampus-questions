<script lang="ts">
	import { resolve } from '$app/paths';
	import { sign_out } from '$lib/auth.remote';

	let { children } = $props();
</script>

<header class="topbar">
	<a class="brand" href={resolve('/')} aria-label="Ecampus Questions, home">
		<span class="brand-name">Ecampus Questions</span>
		<span class="brand-sub">banca domande</span>
	</a>
	<form {...sign_out}>
		<button type="submit" class="sign-out">Esci</button>
	</form>
</header>

{@render children()}

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		align-items: baseline;
		padding: 1.1rem 0 1rem;
		width: var(--measure);
		margin: 0 auto;
		border-bottom: 1px solid var(--rule);
		background: color-mix(in oklch, var(--paper) 88%, transparent);
		backdrop-filter: blur(6px);
		justify-content: space-between;
	}

	.brand {
		display: inline-flex;
		align-items: baseline;
		gap: 0.6rem;
	}

	.brand-name {
		font-family: var(--font-serif);
		font-size: 1.12rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--ink);
	}

	.brand-sub {
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent-strong);
	}

	button {
		all: unset;
		font-size: inherit;
		font-family: var(--font-serif);
		color: var(--accent-strong);
		cursor: pointer;
	}

	@media (max-width: 560px) {
		.brand-sub {
			display: none;
		}
	}
</style>

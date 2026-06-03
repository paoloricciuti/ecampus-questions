<script lang="ts">
	import { check_login_user, login_with_google } from '$lib/auth.remote';

	await check_login_user();
</script>

<svelte:head>
	<title>Accedi | Ecampus Questions</title>
</svelte:head>

<section class="shell">
	<aside class="sample" aria-hidden="true">
		<span class="sample-num">42</span>
		<p class="sample-q">La base dell'italiano moderno è:</p>
		<ul class="sample-a">
			<li><span class="b">A</span> nel fiorentino del Cinquecento</li>
			<li class="picked"><span class="b">B</span> nel fiorentino del secolo XIV</li>
			<li><span class="b">C</span> nel fiorentino del secolo XVII</li>
			<li><span class="b">D</span> nel fiorentino moderno</li>
		</ul>
	</aside>

	<form class="panel" {...login_with_google}>
		<h1>Accedi e torna alla banca domande.</h1>
		<p class="lede">
			Le tue risposte restano legate all'account, non alla scheda del browser. Riprendi su qualsiasi
			dispositivo.
		</p>
		<button class="google">
			<svg viewBox="0 0 18 18" aria-hidden="true" width="18" height="18">
				<path
					fill="#4285F4"
					d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
				/>
				<path
					fill="#34A853"
					d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18Z"
				/>
				<path
					fill="#FBBC05"
					d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33Z"
				/>
				<path
					fill="#EA4335"
					d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58Z"
				/>
			</svg>
			Continua con Google
		</button>
	</form>
</section>

<style>
	.shell {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(20rem, 26rem);
		gap: clamp(2rem, 6vw, 5rem);
		align-items: center;
		min-height: calc(100vh - 12rem);
	}

	.sample {
		position: relative;
		padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem);
		border: 1px solid var(--rule-strong);
		border-radius: 6px;
		background: var(--paper-raised);
		box-shadow: 0 1px 0 var(--rule);
	}

	.sample::before {
		content: '';
		position: absolute;
		top: 1.5rem;
		bottom: 1.5rem;
		left: clamp(1.5rem, 4vw, 3rem);
		width: 1px;
		background: var(--accent);
		opacity: 0.4;
		transform: translateX(-1rem);
	}

	.sample-num {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--ink-faint);
	}

	.sample-q {
		font-family: var(--font-serif);
		font-size: clamp(1.4rem, 3vw, 1.9rem);
		font-weight: 500;
		line-height: 1.3;
		letter-spacing: -0.015em;
		margin: 0.6rem 0 1.6rem;
		color: var(--ink);
	}

	.sample-a {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.7rem;
	}

	.sample-a li {
		display: grid;
		grid-template-columns: 1.7rem 1fr;
		gap: 0.75rem;
		align-items: center;
		color: var(--ink-soft);
		font-size: 0.98rem;
	}

	.b {
		display: grid;
		place-items: center;
		width: 1.7rem;
		height: 1.7rem;
		border: 1.5px solid var(--rule-strong);
		border-radius: 50%;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--ink-faint);
	}

	.picked {
		color: var(--ink);
	}

	.picked .b {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--paper-raised);
	}

	.panel {
		display: grid;
		gap: 1.1rem;
	}

	h1 {
		margin: 0;
		font-family: var(--font-serif);
		font-weight: 500;
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		line-height: 1.08;
		letter-spacing: -0.025em;
		max-width: 16ch;
		color: var(--ink);
	}

	.lede {
		margin: 0;
		max-width: 38ch;
		line-height: 1.6;
		color: var(--ink-soft);
	}

	.google {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
		width: 100%;
		margin-top: 0.4rem;
		padding: 0.85rem 1rem;
		border: 1px solid var(--rule-strong);
		border-radius: 6px;
		background: var(--paper-raised);
		color: var(--ink);
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			border-color 160ms var(--ease),
			background 160ms var(--ease);
	}

	.google:hover {
		border-color: var(--ink-faint);
		background: var(--paper-tint);
	}

	@media (max-width: 720px) {
		.shell {
			grid-template-columns: 1fr;
			gap: 2.5rem;
			min-height: auto;
			padding-top: 1rem;
		}
	}
</style>

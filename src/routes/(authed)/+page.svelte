<script lang="ts">
	import { resolve } from '$app/paths';
	import { get_user } from '$lib/auth.remote';
	import { questions } from '$lib/questions/questions';

	await get_user();

	const exams = Object.entries(questions).map(([exam, exam_questions]) => ({
		exam,
		questions_count: exam_questions.length,
		href: resolve('/(authed)/[exam]', { exam })
	}));

	const total = exams.reduce((sum, e) => sum + e.questions_count, 0);
</script>

<svelte:head>
	<title>Ecampus Questions</title>
</svelte:head>

<section class="intro">
	<h1>Materie d'esame</h1>
	<p>
		{exams.length} banche domande, {total.toLocaleString('it-IT')} quesiti. Scegli una materia e riprendi
		da dove avevi lasciato.
	</p>
</section>

{#if exams.length}
	<ol class="index" aria-label="Materie disponibili">
		{#each exams as { exam, questions_count, href }, i (exam)}
			<li>
				<a class="row" {href}>
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<span class="name">{exam.replaceAll('-', ' ')}</span>
					<span class="count"><b>{questions_count}</b> quesiti</span>
					<span class="go" aria-hidden="true">&rarr;</span>
				</a>
			</li>
		{/each}
	</ol>
{:else}
	<div class="empty">
		<h2>Nessuna banca domande</h2>
		<p>
			Aggiungi dei file JSON in <code>src/lib/questions</code> per popolare l'indice.
		</p>
	</div>
{/if}

<style>
	.intro {
		max-width: 40ch;
		margin-bottom: clamp(2.5rem, 6vw, 4rem);
	}

	h1 {
		font-family: var(--font-serif);
		font-size: clamp(2.6rem, 7vw, 4.4rem);
		font-weight: 500;
		line-height: 1;
		letter-spacing: -0.025em;
		margin: 0 0 1rem;
		color: var(--ink);
	}

	.intro p {
		margin: 0;
		max-width: 46ch;
		font-size: 1.02rem;
		line-height: 1.6;
		color: var(--ink-soft);
	}

	.index {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--rule);
	}

	.index li {
		border-bottom: 1px solid var(--rule);
	}

	.row {
		display: grid;
		grid-template-columns: 2.6rem 1fr auto 1.4rem;
		align-items: baseline;
		gap: clamp(0.8rem, 3vw, 2rem);
		padding: clamp(1.1rem, 2.6vw, 1.7rem) 0.6rem;
		transition:
			background 200ms var(--ease),
			padding-left 200ms var(--ease);
	}

	.row:hover,
	.row:focus-visible {
		background: var(--paper-tint);
		padding-left: 1.4rem;
		outline: none;
	}

	.num {
		font-family: var(--font-mono);
		font-size: 0.82rem;
		color: var(--ink-faint);
		font-variant-numeric: tabular-nums;
	}

	.row:hover .num,
	.row:focus-visible .num {
		color: var(--accent);
	}

	.name {
		font-family: var(--font-serif);
		font-size: clamp(1.5rem, 3.4vw, 2.15rem);
		font-weight: 500;
		line-height: 1.05;
		letter-spacing: -0.02em;
		text-transform: capitalize;
		color: var(--ink);
	}

	.count {
		font-size: 0.86rem;
		color: var(--ink-faint);
		white-space: nowrap;
		font-variant-numeric: tabular-nums;
	}

	.count b {
		font-weight: 600;
		color: var(--ink-soft);
	}

	.go {
		justify-self: end;
		font-size: 1.2rem;
		color: var(--ink-faint);
		transform: translateX(-0.3rem);
		opacity: 0;
		transition:
			transform 200ms var(--ease),
			opacity 200ms var(--ease),
			color 200ms var(--ease);
	}

	.row:hover .go,
	.row:focus-visible .go {
		opacity: 1;
		transform: translateX(0);
		color: var(--accent);
	}

	.empty {
		padding: 2.5rem 0;
		border-top: 1px solid var(--rule);
		max-width: 44ch;
	}

	.empty h2 {
		font-family: var(--font-serif);
		font-weight: 500;
		margin: 0 0 0.5rem;
	}

	.empty p {
		margin: 0;
		color: var(--ink-soft);
		line-height: 1.6;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.85em;
		color: var(--accent-strong);
		background: var(--accent-wash);
		padding: 0.1em 0.35em;
		border-radius: 3px;
	}

	@media (max-width: 560px) {
		.row {
			grid-template-columns: 2.2rem 1fr;
			grid-template-rows: auto auto;
			gap: 0.2rem 0.9rem;
			row-gap: 0.35rem;
		}

		.count {
			grid-column: 2;
		}

		.go {
			display: none;
		}
	}
</style>

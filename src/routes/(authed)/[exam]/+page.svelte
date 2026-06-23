<script lang="ts">
	import { resolve } from '$app/paths';
	import { questions as all_questions } from '$lib/questions/questions';
	import { get_answers, save_answer } from './questions.remote';

	const { params } = $props();
	const questions = $derived(all_questions[params.exam]);
	const answers = $derived(await get_answers(params.exam));
	const answered_count = $derived(answers.length);
	const progress = $derived(questions.length ? (answered_count / questions.length) * 100 : 0);
	const exam_title = $derived(params.exam.replaceAll('-', ' '));
	let search = $state('');
	const filtered_questions = $derived.by(() => {
		const needle = search.trim().toLowerCase();

		if (!needle) return questions.map((question, i) => ({ question, i }));

		return questions
			.map((question, i) => ({ question, i }))
			.filter(({ question }) =>
				[question.question, ...question.answers].some((text) => text.toLowerCase().includes(needle))
			);
	});
</script>

<svelte:head>
	<title>{exam_title} | Ecampus Questions</title>
</svelte:head>

<div class="exam-head">
	<div class="exam-head-top">
		<a class="back" href={resolve('/')}>&larr; Tutte le materie</a>
		<div class="progress" aria-label={`${answered_count} di ${questions.length} risposte salvate`}>
			<span class="frac"><b>{answered_count}</b> / {questions.length}</span>
			<span class="progress-label">salvate</span>
			<span class="track"><span class="fill" style:width={`${progress}%`}></span></span>
		</div>
	</div>
	<h1>{exam_title}</h1>
	<label class="search">
		<span>Cerca nelle domande</span>
		<input bind:value={search} type="search" placeholder="Filtra per testo o risposta" />
	</label>
</div>

<ol class="sheet" aria-label={`Domande di ${exam_title}`}>
	{#each filtered_questions as { question, i } (question.question)}
		{@const saved_answer = answers.find((a) => a.question_id === i)}
		{@const save_form = save_answer.for(i)}
		<li class={{ question: true, answered: !!saved_answer }}>
			<div class="margin">
				<span class="qnum">{i + 1}</span>
				{#if save_form.result?.saved}
					<span class="saved-mark fresh">salvata ora</span>
				{:else if saved_answer}
					<span class="saved-mark">salvato</span>
				{/if}
			</div>

			<form class="body" {...save_form}>
				<input {...save_form.fields.exam.as('hidden', params.exam)} />
				<h2>{question.question}</h2>

				<div class="answers" role="radiogroup" aria-label={`Risposte alla domanda ${i + 1}`}>
					{#each question.answers as answer, answer_i (answer)}
						<label class="option">
							<input
								{...save_form.fields.answer.as('radio', answer_i.toString())}
								onchange={() => save_form.submit()}
								checked={answer_i === saved_answer?.answer}
							/>
							<span class="bubble">{String.fromCharCode(65 + answer_i)}</span>
							<span class="text">{answer}</span>
						</label>
					{/each}
				</div>

				<div class="actions">
					<button class="save" {...save_form.fields.question_id.as('submit', i)}>
						{saved_answer ? 'Aggiorna' : 'Salva risposta'}
					</button>
					{#if save_form.result?.saved}
						<p class="saved-feedback" role="status">Risposta salvata.</p>
					{/if}
				</div>
			</form>
		</li>
	{/each}
</ol>

{#if search && filtered_questions.length === 0}
	<p class="empty">Nessuna domanda trovata per "{search}".</p>
{/if}

<style>
	.exam-head {
		position: sticky;
		top: 3.6rem;
		z-index: 5;
		padding: 1rem 0 1.1rem;
		margin-bottom: 1.5rem;
		background: color-mix(in oklch, var(--paper) 90%, transparent);
		backdrop-filter: blur(6px);
		border-bottom: 1px solid var(--rule-strong);
	}

	.exam-head-top {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1.5rem;
		margin-bottom: 0.7rem;
	}

	.back {
		font-size: 0.85rem;
		font-weight: 500;
		color: var(--ink-soft);
		transition: color 160ms var(--ease);
	}

	.back:hover {
		color: var(--accent);
	}

	.progress {
		display: grid;
		grid-template-columns: auto auto;
		align-items: baseline;
		gap: 0 0.5rem;
		min-width: 9rem;
	}

	.frac {
		font-family: var(--font-mono);
		font-size: 0.95rem;
		font-variant-numeric: tabular-nums;
		color: var(--ink-soft);
	}

	.frac b {
		font-weight: 600;
		color: var(--ink);
	}

	.progress-label {
		font-size: 0.66rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-faint);
	}

	.track {
		grid-column: 1 / -1;
		height: 2px;
		margin-top: 0.5rem;
		background: var(--rule-strong);
		overflow: hidden;
	}

	.fill {
		display: block;
		height: 100%;
		background: var(--accent);
		transition: width 320ms var(--ease);
	}

	h1 {
		margin: 0;
		font-family: var(--font-serif);
		font-weight: 500;
		font-size: clamp(1.9rem, 5vw, 3.1rem);
		line-height: 1;
		letter-spacing: -0.025em;
		text-transform: capitalize;
		color: var(--ink);
	}

	.search {
		display: grid;
		gap: 0.45rem;
		max-width: 32rem;
		margin-top: 1rem;
		color: var(--ink-soft);
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.search input {
		width: 100%;
		padding: 0.7rem 0.8rem;
		border: 1px solid var(--rule-strong);
		border-radius: 5px;
		background: var(--paper-raised);
		color: var(--ink);
		font: inherit;
		font-size: 0.95rem;
		font-weight: 400;
		letter-spacing: 0;
		text-transform: none;
	}

	.search input:focus {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.sheet {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.question {
		display: grid;
		grid-template-columns: 3.2rem 1fr;
		gap: clamp(0.8rem, 3vw, 2rem);
		padding: clamp(1.8rem, 4vw, 2.8rem) 0;
		border-top: 1px solid var(--rule);
	}

	.question:first-child {
		border-top: 0;
	}

	.margin {
		position: sticky;
		top: 9rem;
		align-self: start;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
		height: fit-content;
		padding-top: 0.15rem;
		border-right: 1px solid var(--rule);
	}

	.qnum {
		font-family: var(--font-mono);
		font-size: 1.05rem;
		font-variant-numeric: tabular-nums;
		color: var(--ink-faint);
	}

	.answered .qnum {
		color: var(--ink);
	}

	.saved-mark {
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent);
		writing-mode: vertical-rl;
		margin-top: 0.1rem;
	}

	.saved-mark.fresh {
		color: var(--ink);
	}

	.body {
		display: grid;
		gap: 1.4rem;
		min-width: 0;
	}

	h2 {
		margin: 0;
		max-width: 60ch;
		font-family: var(--font-serif);
		font-weight: 500;
		font-size: clamp(1.2rem, 2.4vw, 1.55rem);
		line-height: 1.35;
		letter-spacing: -0.01em;
		color: var(--ink);
	}

	.answers {
		display: grid;
		gap: 0.1rem;
	}

	.option {
		display: grid;
		grid-template-columns: 1.85rem 1fr;
		gap: 0.85rem;
		align-items: start;
		padding: 0.7rem 0.75rem 0.7rem 0.5rem;
		border-radius: 5px;
		cursor: pointer;
		color: var(--ink-soft);
		transition:
			background 150ms var(--ease),
			color 150ms var(--ease);
	}

	.option:hover {
		background: var(--paper-tint);
		color: var(--ink);
	}

	.option:has(input:checked) {
		color: var(--ink);
	}

	.option input {
		position: absolute;
		width: 1px;
		height: 1px;
		opacity: 0;
		pointer-events: none;
	}

	.bubble {
		display: grid;
		place-items: center;
		width: 1.85rem;
		height: 1.85rem;
		border: 1.5px solid var(--rule-strong);
		border-radius: 50%;
		font-family: var(--font-mono);
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--ink-faint);
		transition:
			border-color 150ms var(--ease),
			background 150ms var(--ease),
			color 150ms var(--ease);
	}

	.option:hover .bubble {
		border-color: var(--ink-faint);
	}

	.option:has(input:checked) .bubble {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--paper-raised);
	}

	.option input:focus-visible + .bubble {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.text {
		padding-top: 0.28rem;
		font-size: 1rem;
		line-height: 1.5;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		flex-wrap: wrap;
	}

	.save {
		justify-self: start;
		margin-top: 0.2rem;
		padding: 0.6rem 1.2rem;
		border: 1px solid var(--ink);
		border-radius: 5px;
		background: var(--ink);
		color: var(--paper-raised);
		font-size: 0.88rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			background 160ms var(--ease),
			border-color 160ms var(--ease),
			color 160ms var(--ease);
	}

	.save:hover {
		background: var(--accent);
		border-color: var(--accent);
	}

	.answered .save {
		background: transparent;
		color: var(--ink-soft);
		border-color: var(--rule-strong);
	}

	.answered .save:hover {
		color: var(--accent);
		border-color: var(--accent);
		background: transparent;
	}

	.saved-feedback,
	.empty {
		margin: 0;
		font-size: 0.9rem;
		color: var(--accent);
	}

	.empty {
		padding: 2rem 0;
		border-top: 1px solid var(--rule);
		color: var(--ink-soft);
	}

	@media (max-width: 640px) {
		.exam-head {
			top: 3.4rem;
		}

		.question {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.margin {
			position: static;
			flex-direction: row;
			align-items: center;
			gap: 0.7rem;
			border-right: 0;
			padding-top: 0;
		}

		.saved-mark {
			writing-mode: horizontal-tb;
			margin-top: 0;
		}
	}
</style>

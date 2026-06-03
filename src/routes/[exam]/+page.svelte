<script lang="ts">
	import { questions as all_questions } from '$lib/questions/questions';
	import { get_answers, save_answer } from './questions.remote';

	const { params } = $props();
	const questions = $derived(all_questions[params.exam]);
	const answers = $derived(await get_answers(params.exam));
</script>

{#each questions as question, i (question.question)}
	{const saved_answer = $derived(answers.find((a) => a.question_id === i))}
	<form class={{answered: !!saved_answer}} {...save_answer.for(i)}>
		<input {...save_answer.fields.exam.as('hidden', params.exam)} />
		<h2>{question.question}</h2>
		<ul>
			{#each question.answers as answer, answer_i (answer)}
				<li>
					<input {...save_answer.fields.answer.as('radio', answer_i.toString())} checked={answer_i === saved_answer?.answer}/>
					{answer}
				</li>
			{/each}
		</ul>
		<button {...save_answer.fields.question_id.as('submit', i)}>Save</button>
	</form>
{/each}

<style>
	.answered {
		background-color: lightgreen;
	}
</style>
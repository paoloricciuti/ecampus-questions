import { form, query } from '$app/server';
import { answers } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import * as v from 'valibot';
import { get_user } from '$lib/auth.remote';

export const get_answers = query(v.string(), async (exam) => {
	const user = await get_user();
	return db
		.select()
		.from(answers)
		.where(and(eq(answers.exam, exam), eq(answers.user_id, user.id)))
		.all();
});

export const save_answer = form(
	v.object({
		exam: v.string(),
		question_id: v.number(),
		answer: v.string()
	}),
	async ({ exam, question_id, answer }) => {
		const user = await get_user();
		await db
			.insert(answers)
			.values({
				exam,
				question_id,
				answer: +answer,
				user_id: user.id
			})
			.onConflictDoUpdate({
				target: [answers.exam, answers.question_id, answers.user_id],
				set: {
					answer: +answer
				}
			});
		get_answers(exam).refresh();
		return { saved: true };
	}
);

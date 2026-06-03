import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

export const answers = sqliteTable('answers', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	exam: text('exam').notNull(),
	question_id: integer('question_id').notNull(),
	answer: integer('answer').notNull(),
	user_id: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export * from './auth.schema';

import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { user } from './auth.schema';

export const answers = sqliteTable(
	'answers',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		exam: text('exam').notNull(),
		question_id: integer('question_id').notNull(),
		answer: integer('answer').notNull(),
		user_id: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' })
	},
	(table) => [uniqueIndex('unique_answer').on(table.exam, table.question_id, table.user_id)]
);

export * from './auth.schema';

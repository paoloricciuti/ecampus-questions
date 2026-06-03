export const questions = Object.fromEntries(
	Object.entries(
		import.meta.glob('./*.json', {
			eager: true,
			import: 'default'
		})
	).map(([path, question]) => [path.slice(2, -5), question])
) as Record<string, { question: string; answers: string[] }[]>;

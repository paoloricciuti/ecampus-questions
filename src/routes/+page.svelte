<script lang="ts">
	import { resolve } from '$app/paths';
	import { get_user } from '$lib/auth.remote';
	import { questions } from '$lib/questions/questions';

	await get_user();
</script>

{#each Object.keys(questions) as exam (exam)}
	<a href={resolve('/[exam]', { exam })}>{exam}</a>
{/each}

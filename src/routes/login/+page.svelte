<script lang="ts">
	import { check_login_user, login_with_google } from '$lib/auth.remote';

	await check_login_user();
</script>

<form {...login_with_google}>
	<button>Login with google</button>
</form>

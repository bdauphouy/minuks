<script>
	import Header from '$lib/components/header.svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';

	export let data;
</script>

<Header />

{#key data.url}
	<div in:fade>
		<slot />
	</div>
{/key}

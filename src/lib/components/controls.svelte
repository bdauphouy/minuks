<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let isPaused: boolean;
</script>

<div class="grid grid-cols-2 w-full md:flex md:items-center gap-4 bg-slate-800 p-2 rounded-md">
	<Button on:click={() => dispatch('toggle')}>
		{#if isPaused}
			<Icon icon="material-symbols:play-arrow" width={24} class="scale-150 md:scale-100" />
		{:else}
			<Icon icon="material-symbols:pause" width={24} class="scale-150 md:scale-100" />
		{/if}
	</Button>
	<Button on:click={() => dispatch('reset')}>
		<Icon icon="material-symbols:replay" width={24} class="scale-150 md:scale-100" />
	</Button>
</div>

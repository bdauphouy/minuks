<script lang="ts">
	import { formatTime } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let index: number;
	export let time: number;
	export let canBeDeleted = false;

	const dispatch = createEventDispatcher();
</script>

<div class="flex gap-8 items-center justify-between text-sm bg-secondary/10 py-3 px-4 rounded-md">
	<span>{index}</span>
	<span>{formatTime(time).string}</span>
	{#if canBeDeleted}
		<button class="text-tertiary" on:click={() => dispatch('delete', index)}>delete</button>
	{/if}
</div>

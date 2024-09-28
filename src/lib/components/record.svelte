<script lang="ts">
	import type { Record } from '$lib/types';
	import { formatTime } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	export let index: number;
	export let record: Record;
	export let canBeDeleted = false;

	const dispatch = createEventDispatcher();
</script>

<div class="flex gap-8 items-center justify-between text-sm bg-slate-800 px-4 py-3 rounded-md">
	<span>{index}</span>
	<span>{formatTime(record.elapsed).string}</span>
	{#if canBeDeleted}
		<button
			class="transition-colors duration-300 hover:text-tertiary"
			on:click={() => dispatch('delete', record.createdAt)}>delete</button
		>
	{/if}
</div>

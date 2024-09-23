<script lang="ts">
	import Chart from '$lib/components/chart.svelte';
	import Record from '$lib/components/record.svelte';
	import type { Record as TRecord } from '$lib/types';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let records: TRecord[] = [];
	let filterType: 'date' | 'elapsed' = 'date';

	const remove = (e: CustomEvent) => {
		records = records.filter((_, i) => i !== e.detail - 1);

		localStorage.setItem('records', JSON.stringify(records));
	};

	$: filteredRecords = records.sort((a, b) => {
		if (filterType === 'date') {
			return b.createdAt - a.createdAt;
		}

		return a.elapsed - b.elapsed;
	});

	onMount(() => {
		const storedRecords = localStorage.getItem('records');

		if (storedRecords) {
			records = JSON.parse(storedRecords);
		}
	});
</script>

<div class="px-4 pt-12 pb-4 text-sm grid grid-cols-3 gap-2 h-screen absolute w-full top-0">
	<div class="flex flex-col gap-2 overflow-hidden">
		<header class="border-b border-slate-200 pb-1 flex justify-between items-center">
			<h3>records</h3>
			<div class="flex gap-2 items-center">
				<button
					class:text-tertiary={filterType === 'date'}
					class="transition-colors duration-300 hover:text-tertiary"
					on:click={() => (filterType = 'date')}>date</button
				>
				<button
					class:text-tertiary={filterType === 'elapsed'}
					class="transition-colors duration-300 hover:text-tertiary"
					on:click={() => (filterType = 'elapsed')}>elapsed</button
				>
			</div>
		</header>
		{#if records.length === 0}
			<span>no records yet</span>
		{/if}
		<ul class="flex flex-col gap-2 overflow-y-auto">
			{#each filteredRecords as { elapsed }, index (index)}
				<li in:fade={{ delay: index * 50 }}>
					<Record index={index + 1} {elapsed} canBeDeleted on:delete={remove} />
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex flex-col gap-2 col-span-2">
		<h3 class="border-b border-slate-200 bg-slate-900 -mt-4 pt-4 pb-1">chart</h3>
		{#if records.length === 0}
			<span>no data</span>
		{:else}
			<div class="bg-slate-800 rounded-md p-4">
				<Chart {records} />
			</div>
		{/if}
	</div>
</div>

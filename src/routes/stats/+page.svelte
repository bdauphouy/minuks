<script lang="ts">
	import Box from '$lib/components/box.svelte';
	import Chart from '$lib/components/chart.svelte';
	import Record from '$lib/components/record.svelte';
	import Stat from '$lib/components/stat.svelte';
	import type { Record as TRecord } from '$lib/types';
	import { formatTime } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let records: TRecord[] = [];
	let filterType: 'date' | 'elapsed' = 'date';

	$: average = records.reduce((acc, { elapsed }) => acc + elapsed, 0) / records.length;
	$: median = records[Math.floor(records.length / 2)]?.elapsed;
	$: min = records.reduce((acc, { elapsed }) => Math.min(acc, elapsed), Infinity);
	$: max = records.reduce((acc, { elapsed }) => Math.max(acc, elapsed), 0);
	$: totalTime = records.reduce((acc, { elapsed }) => acc + elapsed, 0);

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

<div
	class="px-4 pt-12 pb-4 text-sm grid grid-cols-1 lg:grid-cols-3 gap-y-2 lg:gap-2 h-screen absolute w-full top-0"
>
	<div class="flex flex-col order-3 gap-2 lg:order-none lg:overflow-hidden">
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
			<span class="bg-slate-800 py-3 px-4 rounded-md">no records yet</span>
		{/if}
		<ul class="flex flex-col gap-2 overflow-y-auto pb-4 lg:pb-0">
			{#each filteredRecords as { elapsed }, index (index)}
				<li in:fade={{ delay: index * 50 }}>
					<Record index={index + 1} {elapsed} canBeDeleted on:delete={remove} />
				</li>
			{/each}
		</ul>
	</div>
	<div class="flex flex-col gap-2 col-span-2">
		<h3 class="border-b border-slate-200 bg-slate-900 -mt-4 pt-4 pb-1">chart</h3>
		<Box>
			<Chart records={records.reverse()} average={formatTime(average).seconds} />
		</Box>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 flex-1">
			<Stat label="number of records" value={records.length} />
			<Stat label="total time" value={formatTime(totalTime).string} />
			<Stat label="average time" value={formatTime(average).string} />
			<Stat label="median time" value={formatTime(median).string} />
			<Stat label="worst time" value={formatTime(max).string} />
			<Stat label="best time" value={formatTime(min).string} />
		</div>
	</div>
</div>

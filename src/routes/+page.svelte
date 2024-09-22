<script lang="ts">
	import Controls from '$lib/components/controls.svelte';
	import Data from '$lib/components/data.svelte';
	import Keybind from '$lib/components/keybind.svelte';
	import Record from '$lib/components/record.svelte';
	import Timer from '$lib/components/timer.svelte';
	import type { Record as TRecord } from '$lib/types';
	import { formatTime } from '$lib/utils';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let elapsed = 0;
	let start = 0;
	let isPaused = true;
	let records: TRecord[] = [];

	const loop = () => {
		if (isPaused) return;

		elapsed = Date.now() - start;
		requestAnimationFrame(loop);
	};

	const toggle = () => {
		isPaused = !isPaused;

		if (!isPaused) {
			start = Date.now() - elapsed;
		}

		loop();
	};

	const reset = () => {
		save();

		isPaused = true;
		elapsed = 0;
	};

	const save = () => {
		if (elapsed === 0) return;

		records = [...records, { elapsed, createdAt: Date.now() }].sort(
			(a, b) => a.elapsed - b.elapsed
		);

		localStorage.setItem('records', JSON.stringify(records));
	};

	const clear = () => {
		if (!confirm('Are you sure you want to clear all records?')) return;

		records = [];
		localStorage.removeItem('records');
	};

	const keybinds = [
		{ key: ' ', label: 'play/pause', callback: toggle },
		{ key: 'r', label: 'reset', callback: reset },
		{ key: 's', label: 'save', callback: save },
		{ key: 'c', label: 'clear', callback: clear }
	];

	$: mean = records.reduce((a, b) => a + b.elapsed, 0) / records.length;

	$: median = records[Math.floor(records.length / 2)]?.elapsed;

	onMount(() => {
		const storedRecords = localStorage.getItem('records');

		if (storedRecords) {
			records = JSON.parse(storedRecords);
		}
	});
</script>

<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
	<header class="mb-4 flex justify-between gap-4 items-center">
		{#if mean}
			<div in:fade>
				<Data label="mean" value={formatTime(mean).seconds} />
			</div>
		{/if}
		{#if median}
			<div class="block" in:fade>
				<Data label="med" value={formatTime(median).seconds} />
			</div>
		{/if}
		{#if records[0]}
			<div in:fade class="flex gap-4">
				<Data label="best" value={formatTime(records[0].elapsed).seconds} />
				<Data label="worst" value={formatTime(records[records.length - 1].elapsed).seconds} />
				<Data label="nb" value={records.length} />
			</div>
		{/if}
	</header>
	<Timer {elapsed} />
</div>
<ul class="hidden md:flex flex-col absolute top-1/2 -translate-y-1/2 right-4 gap-2">
	{#each records.slice(0, 10) as { elapsed }, index (index)}
		<li in:fade={{ delay: index * 50 }}>
			<Record index={index + 1} {elapsed} />
		</li>
	{/each}
</ul>
<div class="absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col gap-2 items-center">
	<Controls {isPaused} on:toggle={toggle} on:reset={reset} />
</div>
<ul class="absolute left-0 top-1/2 -translate-y-1/2 ml-4 mb-4 hidden md:flex flex-col gap-4">
	{#each keybinds as { key, label, callback }, index (index)}
		<li in:fade={{ delay: index * 50 }}>
			<Keybind {key} {label} {callback} />
		</li>
	{/each}
</ul>

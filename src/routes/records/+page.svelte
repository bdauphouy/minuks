<script lang="ts">
	import Record from '$lib/components/record.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let records: number[] = [];

	const remove = (e: CustomEvent) => {
		records = records.filter((_, i) => i !== e.detail - 1);
		localStorage.setItem('records', JSON.stringify(records));
	};

	onMount(() => {
		const storedRecords = localStorage.getItem('records');

		if (storedRecords) {
			records = JSON.parse(storedRecords);
		}
	});
</script>

{#if records.length === 0}
	<span class="text-center block text-sm">no records yet</span>
{/if}
<ul class="max-w-sm mx-auto flex flex-col gap-2 px-4 pb-4">
	{#each records as time, index (index)}
		<li in:fade={{ delay: index * 50 }}>
			<Record index={index + 1} {time} canBeDeleted on:delete={remove} />
		</li>
	{/each}
</ul>

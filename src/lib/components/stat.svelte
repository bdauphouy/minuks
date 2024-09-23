<script lang="ts">
	import Box from '$lib/components/box.svelte';

	export let label;
	export let value;
</script>

<Box>
	<div class="flex flex-col gap-2">
		<h3 class="text-tertiary">{label}</h3>
		<span class="text-4xl">{value}</span>
	</div>
</Box>

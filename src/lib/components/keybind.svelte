<script lang="ts">
	export let key;
	export let label;
	export let callback: () => void;

	const handleKeydown = (event: KeyboardEvent) => {
		if (event.key !== key) return;

		callback();
	};
</script>

<svelte:window on:keydown={handleKeydown} />

<span class="text-sm">
	<span class="bg-slate-800 p-2 rounded-md">{key === ' ' ? 'space' : key}</span> - {label}
</span>

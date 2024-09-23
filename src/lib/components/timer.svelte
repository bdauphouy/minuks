<script lang="ts">
	import { formatTime } from '$lib/utils';

	export let elapsed = 0;
</script>

<span class="text-6xl">{formatTime(elapsed, { hasDashFallback: false }).string}</span>

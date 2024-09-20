<script lang="ts">
	import { page } from '$app/stores';
</script>

<span class="text-center block text-sm">{$page.error?.message.toLowerCase()}</span>
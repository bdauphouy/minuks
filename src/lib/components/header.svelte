<script lang="ts">
	import { page } from '$app/stores';

	const links = {
		home: '/',
		stats: '/stats',
		github: 'https://github.com/bdauphouy/minuks'
	};
</script>

<header class="p-4 sticky w-full top-0 text-sm bg-slate-900 z-10">
	<nav class="flex justify-between">
		<h1>
			<a href="/">minuks</a> by
			<a href="https://bdau.fr" class="text-tertiary">bado</a>
		</h1>
		<ul class="flex gap-4">
			{#each Object.entries(links) as [name, link]}
				{#if $page.route.id !== link}
					<li>
						<a href={link} class="transition-colors duration-300 hover:text-tertiary">{name}</a>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>
</header>

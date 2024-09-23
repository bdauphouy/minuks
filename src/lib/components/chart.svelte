<script lang="ts">
	import type { Record } from '$lib/types';
	import { formatTime } from '$lib/utils';
	import { Chart } from 'chart.js/auto';
	import annotationPlugin from 'chartjs-plugin-annotation';
	import { onMount, tick } from 'svelte';

	export let records: Record[];
	export let average: number;
	let canvas: HTMLCanvasElement;
	let chart: Chart;

	onMount(async () => {
		await tick();

		if (records.length === 0) return;

		Chart.register(annotationPlugin);
		Chart.defaults.font.family = 'Roboto Mono';
		Chart.defaults.font.size = 14;
		Chart.defaults.color = '#e2e8f0';

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels: [...Array(records.length).keys()].map(String),
				datasets: [
					{
						label: 'elapsed',
						data: records.map(({ elapsed }) => formatTime(elapsed).seconds),
						borderWidth: 2,
						borderColor: '#e2e8f0',
						pointStyle: 'circle',
						pointRadius: 0,
						pointHitRadius: 5,
						tension: 0.4
					}
				]
			},
			options: {
				scales: {
					y: {
						grid: {
							lineWidth: 0.5,
							color: '#0f172a'
						},
						min: 0,
						ticks: {
							color: (context) => {
								return context.tick.value === average ? '#e1b61c' : '#e2e8f0';
							}
						},
						afterBuildTicks: (chart) =>
							(chart.ticks = [...chart.ticks, { value: average }].map((tick) => ({
								value: tick.value
							})))
					},
					x: {
						grid: {
							lineWidth: 0.5,
							color: '#0f172a'
						},
						ticks: {
							display: false
						}
					}
				},
				plugins: {
					annotation: {
						annotations: {
							line: {
								type: 'line',
								borderColor: '#e1b61c',
								borderWidth: 2,
								scaleID: 'y',
								value: average,
								label: {
									content: 'average',
									display: true,
									backgroundColor: '#e1b61c',
									borderRadius: 10,
									padding: {
										x: 8,
										y: 2
									},
									position: 'end',
									font: {
										weight: 'normal'
									}
								}
							}
						}
					},
					legend: {
						display: false
					},
					tooltip: {
						displayColors: false,
						backgroundColor: '#0f172a',
						titleColor: '#e2e8f0',
						bodyColor: '#e2e8f0',
						callbacks: {
							title: () => '',
							label: ({ raw }) => (raw || '0') as string
						}
					}
				}
			}
		});
	});

	$: {
		if (chart) {
			chart.data.labels = [...Array(records.length).keys()].map(String);
			chart.data.datasets[0].data = records.map(({ elapsed }) => formatTime(elapsed).seconds);
			// @ts-ignore - chartjs-plugin-annotation types are incorrect
			chart.options.plugins.annotation.annotations.line.value = average;
			chart.update();
		}
	}
</script>

{#if records.length === 0}
	<span>no records yet</span>
{:else}
	<canvas bind:this={canvas} />
{/if}

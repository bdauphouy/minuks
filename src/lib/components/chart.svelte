<script lang="ts">
	import type { Record } from '$lib/types';
	import { formatTime } from '$lib/utils';
	import { Chart } from 'chart.js/auto';
	import annotationPlugin from 'chartjs-plugin-annotation';
	import { onMount, tick } from 'svelte';

	export let records: Record[];
	let canvas: HTMLCanvasElement;

	$: mean = formatTime(records.reduce((a, b) => a + b.elapsed, 0) / records.length).seconds;

	onMount(async () => {
		await tick();

		Chart.register(annotationPlugin);
		Chart.defaults.font.family = 'Roboto Mono';
		Chart.defaults.font.size = 14;
		Chart.defaults.color = '#e2e8f0';

		new Chart(canvas, {
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
						max: Math.max(...records.map(({ elapsed }) => formatTime(elapsed).seconds * 1.5)),
						ticks: {
							color: (context) => {
								return context.tick.value === mean ? '#e1b61c' : '#e2e8f0';
							}
						},
						afterBuildTicks: (chart) =>
							(chart.ticks = [...chart.ticks, { value: mean }].map((tick) => ({
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
								value: mean,
								label: {
									content: 'mean',
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
</script>

<canvas bind:this={canvas} />

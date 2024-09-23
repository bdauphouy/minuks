export const pad = (n: number) => n.toString().padStart(2, '0');

interface Options {
	hasDashFallback?: boolean;
}

export const formatTime = (
	elapsed: number,
	options: Options = {
		hasDashFallback: true
	}
) => {
	const centiseconds = Math.floor(elapsed / 10) % 100;
	const seconds = Math.floor(elapsed / 1000);
	const minutes = Math.floor(seconds / 60);

	if (
		isNaN(centiseconds) ||
		isNaN(seconds) ||
		isNaN(minutes) ||
		(elapsed === 0 && options.hasDashFallback)
	) {
		return {
			seconds: 0,
			string: '-'
		};
	}

	const string = `${pad(seconds % 60)}:${pad(centiseconds)}`;

	return {
		seconds,
		string: minutes === 0 ? string : `${pad(minutes)}:${string}`
	};
};

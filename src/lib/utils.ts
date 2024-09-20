export const pad = (n: number) => n.toString().padStart(2, '0');

export const formatTime = (elapsed: number) => {
	const centiseconds = Math.floor(elapsed / 10) % 100;
	const seconds = Math.floor(elapsed / 1000);
	const minutes = Math.floor(seconds / 60);

	return {
		seconds,
		string: `${pad(minutes)}:${pad(seconds % 60)}:${pad(centiseconds)}`
	};
};

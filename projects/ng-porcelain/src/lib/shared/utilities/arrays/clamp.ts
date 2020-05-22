export function clamp(value: number, min: number, max: number): number {
	if (min <= value && value <= max) {
		return value;
	} else if (value < min) {
		return min;
	} else if (max < value) {
		return max;
	}
}

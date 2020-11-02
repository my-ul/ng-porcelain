/**
 * Ensures value is within the min-max range.
 * @param min Lowest possible value to return
 * @param value Desired value to return
 * @param max Highest possible value to return
 */
export function clamp(min: number, value: number, max: number) {
	return Math.min(Math.max(min, value), max);
}

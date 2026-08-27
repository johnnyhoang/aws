/**
 * Fisher-Yates (Knuth) Shuffle Algorithm
 * Guarantees completely unbiased O(n) uniform random permutation.
 * Essential for exam simulators, multiple-choice quizzes, and interactive games
 * to ensure no single option position (e.g. Option A) is biased.
 */

export function fisherYatesShuffle<T>(items: readonly T[] | T[]): T[] {
  if (!items || items.length <= 1) return [...items];
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Shuffles indices and returns mapping to track original positions.
 */
export function getShuffledIndices(length: number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  return fisherYatesShuffle(indices);
}

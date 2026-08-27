import { ARCH_CHALLENGES_PART1, ArchitectureChallenge } from './archChallengesPart1';
import { ARCH_CHALLENGES_PART2 } from './archChallengesPart2';

export type { ArchitectureChallenge };

export const ARCHITECTURE_CHALLENGES: ArchitectureChallenge[] = [
  ...ARCH_CHALLENGES_PART1,
  ...ARCH_CHALLENGES_PART2
];

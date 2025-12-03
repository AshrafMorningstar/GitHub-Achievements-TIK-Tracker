export enum Rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  LEGENDARY = 'Legendary',
  LEGACY = 'Legacy',
  SPECIAL = 'Special Event'
}

export interface AchievementTier {
  name: string;
  image: string;
  description: string;
}

export interface Achievement {
  id: string;
  slug?: string; // The specific parameter used in GitHub URLs (e.g. ?achievement=pull-shark)
  name: string;
  description: string;
  howToEarn: string;
  rarity: Rarity;
  tiers?: AchievementTier[];
  image: string; // Default image
  color?: string; // Accent color for the card
}

export type FilterType = 'ALL' | Rarity;
export type SortOption = 'NAME_ASC' | 'NAME_DESC' | 'RARITY_ASC' | 'RARITY_DESC';
export type OwnershipFilter = 'ALL' | 'OWNED' | 'UNOWNED';
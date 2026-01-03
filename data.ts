/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import { Achievement, Rarity } from './types';

// Using raw.githubusercontent.com from the reference repo (drknzz/GitHub-Achievements) or similar reliable sources for badge images.
// Where direct specific tiered images are not easily hotlinkable, we use the default generic representation.

export const achievements: Achievement[] = [
  {
    id: 'pull-shark',
    slug: 'pull-shark',
    name: 'Pull Shark',
    description: 'Opened pull requests that have been merged.',
    howToEarn: 'Open a Pull Request that gets merged. Tiers are based on the number of merged PRs.',
    rarity: Rarity.COMMON,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pull%20Shark/Default.png',
    color: '#4cb4ff',
    tiers: [
      { name: 'Bronze', description: '2 Merged PRs', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pull%20Shark/Bronze.png' },
      { name: 'Silver', description: '16 Merged PRs', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pull%20Shark/Silver.png' },
      { name: 'Gold', description: '1024 Merged PRs', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pull%20Shark/Gold.png' }
    ]
  },
  {
    id: 'galaxy-brain',
    slug: 'galaxy-brain',
    name: 'Galaxy Brain',
    description: 'Answered discussions with accepted answers.',
    howToEarn: 'Provide an answer in a GitHub Discussion that is marked as the accepted answer.',
    rarity: Rarity.RARE,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Galaxy%20Brain/Default.png',
    color: '#a371f7',
    tiers: [
      { name: 'Bronze', description: '2 Accepted Answers', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Galaxy%20Brain/Bronze.png' },
      { name: 'Silver', description: '8 Accepted Answers', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Galaxy%20Brain/Silver.png' },
      { name: 'Gold', description: '16 Accepted Answers', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Galaxy%20Brain/Gold.png' }
    ]
  },
  {
    id: 'yolo',
    slug: 'yolo',
    name: 'YOLO',
    description: 'Merged a pull request without code review.',
    howToEarn: 'Merge a Pull Request into the default branch without a code review (requires admin privileges or repo settings allowing it).',
    rarity: Rarity.RARE,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/YOLO/Default.png',
    color: '#f1e05a'
  },
  {
    id: 'quickdraw',
    slug: 'quickdraw',
    name: 'Quickdraw',
    description: 'Closed an issue or pull request within 5 minutes of opening.',
    howToEarn: 'Close an issue or merge a PR within 5 minutes of its creation.',
    rarity: Rarity.RARE,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Quickdraw/Default.png',
    color: '#f0883e'
  },
  {
    id: 'starstruck',
    slug: 'starstruck',
    name: 'Starstruck',
    description: 'Created a repository that has many stars.',
    howToEarn: 'Create a repository that receives a certain number of stars.',
    rarity: Rarity.COMMON,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Starstruck/Default.png',
    color: '#ffd33d',
    tiers: [
      { name: 'Bronze', description: '16 Stars', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Starstruck/Bronze.png' },
      { name: 'Silver', description: '128 Stars', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Starstruck/Silver.png' },
      { name: 'Gold', description: '512 Stars', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Starstruck/Gold.png' }
    ]
  },
  {
    id: 'pair-extraordinaire',
    slug: 'pair-extraordinaire',
    name: 'Pair Extraordinaire',
    description: 'Co-authored commits in merged pull requests.',
    howToEarn: 'Co-author a commit that gets merged. Add "Co-authored-by: user <email>" to the commit message.',
    rarity: Rarity.COMMON,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pair%20Extraordinaire/Default.png',
    color: '#ff7b72',
    tiers: [
      { name: 'Bronze', description: '10 Co-authored commits', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pair%20Extraordinaire/Bronze.png' },
      { name: 'Silver', description: '24 Co-authored commits', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pair%20Extraordinaire/Silver.png' },
      { name: 'Gold', description: '48 Co-authored commits', image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Pair%20Extraordinaire/Gold.png' }
    ]
  },
  {
    id: 'public-sponsor',
    slug: 'public-sponsor',
    name: 'Public Sponsor',
    description: 'Sponsored an open source contributor.',
    howToEarn: 'Sponsor someone on GitHub Sponsors.',
    rarity: Rarity.COMMON,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Public%20Sponsor/Default.png',
    color: '#ea4aaa'
  },
  {
    id: 'arctic-code-vault',
    slug: 'arctic-code-vault-contributor',
    name: 'Arctic Code Vault',
    description: 'Contributed code to a repository preserved in the Arctic Code Vault.',
    howToEarn: 'Awarded to users who contributed to any public repository that was snapshotted for the Arctic Code Vault (02/02/2020).',
    rarity: Rarity.SPECIAL,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Arctic%20Code%20Vault%20Contributor/Default.png',
    color: '#7ee787'
  },
  {
    id: 'mars-2020',
    slug: 'mars-2020-contributor',
    name: 'Mars 2020 Contributor',
    description: 'Contributed to a repository used in the Mars 2020 mission.',
    howToEarn: 'Contributed to one of the specific libraries/repositories used by NASA/JPL for the Mars 2020 mission (Ingenuity/Perseverance).',
    rarity: Rarity.LEGENDARY,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Mars%202020%20Contributor/Default.png',
    color: '#e5534b'
  },
  {
    id: 'developer-program',
    slug: 'developer-program-member',
    name: 'Developer Program',
    description: 'Member of the GitHub Developer Program.',
    howToEarn: 'Register for the GitHub Developer Program.',
    rarity: Rarity.COMMON,
    image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/GitHub%20Developer%20Program%20Member/Default.png',
    color: '#58a6ff'
  },
  {
    id: 'security-bug-bounty',
    slug: 'security-bug-bounty-hunter',
    name: 'Security Bug Bounty',
    description: 'Hunted down a security vulnerability.',
    howToEarn: 'Report a valid security vulnerability to GitHub via HackerOne.',
    rarity: Rarity.LEGENDARY,
    image: 'https://github.githubassets.com/images/modules/profile/achievements/security-bug-bounty-hunter-default.png',
    color: '#a371f7'
  },
  {
    id: 'open-sourcerer',
    slug: 'open-sourcerer',
    name: 'Open Sourcerer',
    description: 'Contributed to open source.',
    howToEarn: 'Legacy badge for earlier open source contributions. (No longer obtainable for new users in the same way).',
    rarity: Rarity.LEGACY,
    image: 'https://github.githubassets.com/images/modules/profile/achievements/open-sourcerer-default.png',
    color: '#79c0ff'
  }
];

export const secretAchievement: Achievement = {
  id: 'secret-hunter',
  name: 'Secret Hunter',
  description: 'You discovered the hidden easter egg!',
  howToEarn: 'Unlocked by clicking the "GitHub Achievements" title 3 times.',
  rarity: Rarity.LEGENDARY,
  // Using a distinct image or reusing a cool one to signify the secret
  image: 'https://raw.githubusercontent.com/drknzz/GitHub-Achievements/main/Images/Arctic%20Code%20Vault%20Contributor/Default.png', 
  color: '#c9d1d9'
};
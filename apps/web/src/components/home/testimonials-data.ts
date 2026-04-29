export type Testimonial = {
  name: string;
  avatar: string;
  comment: string;
  gif?: string;
};

export type LikedByPerson = {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  invertDark?: boolean;
};

export const ROW_1: Testimonial[] = [
  {
    name: "Franco RATOVOSON",
    avatar: "https://avatars.githubusercontent.com/u/56756707?v=4",
    comment: "Arguably one of the best project I've seen this year so far",
  },
  {
    name: "L O N E W O L F Y Y Y",
    avatar:
      "https://media.daily.dev/image/upload/s--wag-hhTD--/f_auto/v1766369493/avatars/avatar_AbK3RY9foIiA0YV98aWGf",
    comment: "This was actually helpful!",
  },
  {
    name: "Angel Vargas",
    avatar:
      "https://media.daily.dev/image/upload/s--nL89dcPB--/f_auto/v1761601327/avatars/avatar_M5whAdqZH",
    comment: "such a cool project :0",
  },
  {
    name: "Theo",
    avatar:
      "https://media.daily.dev/image/upload/s--E5jYSemI--/f_auto/v1772433336/avatars/avatar_PqPmsWVzkXaGHZf51zept",
    comment: "I like this a lot.",
  },
  {
    name: "Mr Binary Sniper",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKJz22dnnCRo3u-wMdwkc0hhctXTlv_dgoIbPa_05kkcQHWtTc=s96-c",
    comment: "awesome project",
  },
  {
    name: "Canse",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJA1pl1H1BtyanbxsW8msaDZJGBxzBkloQepE8_BB3h94Y=s96-c",
    comment: "Crazy",
  },
  {
    name: "Anirudh Sahu",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIXjNqXQWC45boUOh40GH3lqviXRqok0xKDHmgEHpi7oN183g=s96-c",
    comment: "nice!",
  },
  {
    name: "rizalefhndi",
    avatar:
      "https://media.daily.dev/image/upload/s--ukVGv6qv--/f_auto/v1770254654/avatars/avatar_UNd7l5GPiQELdZUM9IM5p",
    comment: "very good",
  },
];

export const ROW_2: Testimonial[] = [
  {
    name: "Gabu Rayon Dev",
    avatar:
      "https://media.daily.dev/image/upload/s--5hPC52y_--/f_auto/v1773412842/avatars/avatar_8fkdziGASnSSBES6c4Ml9",
    comment:
      "424 options sounds powerful. The real question is how deep the generated code goes — if it actually handles the opinionated glue between layers, this is genuinely impressive infrastructure.",
  },
  {
    name: "Maxx",
    avatar:
      "https://media.daily.dev/image/upload/s--_XufsF_I--/f_auto/v1741599580/avatars/avatar_J12t3Jj2x",
    comment: "something like this...",
    gif: "https://media.tenor.com/iTZFtJIiiZMAAAAC/rick-sanchez.gif",
  },
  {
    name: "Franco Carrara",
    avatar: "https://avatars.githubusercontent.com/u/6468230?v=4",
    comment:
      "I find it really useful. I tried a lot of combinations for my projects! Thanks for building this amazing OSS!",
  },
  {
    name: "Phlisg",
    avatar:
      "https://media.daily.dev/image/upload/s--FN_ynnjb--/f_auto/v1755006303/avatars/avatar_Y1klcvmY0LiikjVFthCLU",
    comment:
      "Great project! Would love to see more frameworks proposed. Awesome work!",
  },
  {
    name: "Dani",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLlBPJNTb6tS4ntqfQMs--4xvzxjS7REGhzHwEcceuxEKDnWUTG=s96-c",
    comment: "looks good but I miss spring boot for the backend options",
  },
];

export const ROW_3: Testimonial[] = [
  {
    name: "srmdn",
    avatar:
      "https://media.daily.dev/image/upload/s--sgM5PGvW--/f_auto/v1750635589/avatars/avatar_tfllEwSHlmvILiLAujyGu",
    comment: "Wow actually helpful. Thanks for sharing",
  },
  {
    name: "Alexander Schulz",
    avatar:
      "https://media.daily.dev/image/upload/s--QyqhQraa--/f_auto/v1739916402/avatars/avatar_ZSilQjs5aEuu2oZF7mSsN",
    comment: "Reminds me of vike.dev/new — Nice work!!",
  },
  {
    name: "theLazyBoy",
    avatar: "https://avatars.githubusercontent.com/u/114607201?v=4",
    comment: "love it",
  },
  {
    name: "Matheus Schumacher",
    avatar:
      "https://lh3.googleusercontent.com/a/AEdFTp7k-PHrHNuR4Cm1V8x9yDym4av9G8ebnSA2pHmWaA=s96-c",
    comment: "Discovered a few tecs I didn't know. Thanks",
  },
  {
    name: "Vinicius Pagung",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocIPaXr32GKCKrbcxzIUPSaJOkOsFRQTOf-ycxkANuxwADhyvvIlgQ=s96-c",
    comment: "awesome project!",
  },
];

export const LIKED_BY: LikedByPerson[] = [
  {
    name: "Tanner Linsley",
    handle: "tannerlinsley",
    avatar: "https://github.com/tannerlinsley.png",
    role: "Creator of TanStack",
  },
  {
    name: "SaltyAom",
    handle: "saltyAom",
    avatar: "https://github.com/SaltyAom.png",
    role: "Creator of Elysia",
  },
  {
    name: "ElysiaJS",
    handle: "elysiaJS",
    avatar: "https://github.com/elysiajs.png",
    role: "Ergonomic web framework",
  },
  {
    name: "Dev Agrawal",
    handle: "devagrawal09",
    avatar: "https://github.com/devagrawal09.png",
    role: "Clerk DevRel",
  },
  {
    name: "Hayden Bleasel",
    handle: "haydenbleasel",
    avatar: "https://github.com/haydenbleasel.png",
    role: "Creator of Ultracite",
  },
  {
    name: "SolidJS",
    handle: "solid_js",
    avatar: "https://github.com/solidjs.png",
    role: "Reactive JavaScript library",
  },
  {
    name: "Base UI",
    handle: "base_ui",
    avatar: "/icon/base-ui.svg",
    role: "Unstyled UI components",
    invertDark: true,
  },
];

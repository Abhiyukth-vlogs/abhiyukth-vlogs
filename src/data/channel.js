// Only add videos after verifying channel ownership and the original title.
export const channel = {
  name: 'Abhiyukth Vlogs',
  handle: '@abhiyukthvlogs',
  url: 'https://www.youtube.com/@abhiyukthvlogs',
  subscribeUrl: 'https://www.youtube.com/@abhiyukthvlogs?sub_confirmation=1',
  streamsUrl: 'https://www.youtube.com/@abhiyukthvlogs/streams',
  playlistsUrl: 'https://www.youtube.com/@abhiyukthvlogs/playlists',
  description: 'Join Abhiyukth Vlogs for PS5 adventures, Malayalam live streams, travel, and everyday moments.',
  avatar: './assets/av-mark.svg',
  siteUrl: 'https://abhiyukth-vlogs.github.io/abhiyukth-vlogs/', // Pages URL returned by GitHub; SITE_URL can override at build time.
  socials: []
};
// {id, title, category: 'Gaming'|'Vlogs'|'Live Replays', thumbnail,
//  verifiedChannelUrl, verifiedAt, verificationSource}
// YouTube fetch was throttled on 2026-10-04; no unverified records are published.
export const videos = [];
// {title, url, verificationSource}
export const playlists = [];

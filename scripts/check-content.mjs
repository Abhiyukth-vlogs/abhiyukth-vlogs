import assert from 'node:assert/strict';
import {channel,videos,playlists} from '../src/data/channel.js';
const ids=new Set();
for(const v of videos){
  assert.match(v.id,/^[\w-]{11}$/,'Invalid YouTube ID');
  assert(!ids.has(v.id),'Duplicate video ID');ids.add(v.id);
  assert(v.title?.trim(),'Missing exact title');
  assert(['Gaming','Vlogs','Live Replays'].includes(v.category),'Unknown category');
  assert.equal(v.verifiedChannelUrl,channel.url,'Channel ownership must be verified');
  assert(v.verificationSource?.startsWith('https://'),'Record verification source');
  assert(!Number.isNaN(Date.parse(v.verifiedAt)),'Record verification date');
  assert(v.thumbnail?.startsWith('https://')||v.thumbnail?.startsWith('./assets/'),'Invalid thumbnail');
}
for(const p of playlists){assert(p.title?.trim());assert.match(p.url,/^https:\/\/www\.youtube\.com\/playlist\?list=/);assert(p.verificationSource?.startsWith('https://'));}
console.log(`Content valid: ${videos.length} verified videos, ${playlists.length} verified playlists.`);
if(!videos.length)console.log('Channel content verification is pending; honest empty states will be published.');

import { defineConfig } from 'vite';
import { channel, videos, playlists } from './src/data/channel.js';

const escape = (text) => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const videoCard = (video, featured = false) => `<a class="video-card ${featured ? 'featured-card' : ''}" href="https://www.youtube.com/watch?v=${escape(video.id)}" data-video="${escape(video.id)}"><div class="thumbnail"><img src="${escape(video.thumbnail)}" alt="" loading="lazy" width="1280" height="720"><span class="play-badge" aria-hidden="true">▶</span></div><span class="video-category">${escape(video.category)}</span><h3>${escape(video.title)}</h3><span class="text-link">Watch on YouTube ↗</span></a>`;
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/abhiyukth-vlogs/',
  plugins: [{name:'static-channel-content', transformIndexHtml(html) {
    const siteUrl = process.env.SITE_URL || channel.siteUrl;
    const metadata = siteUrl ? `<link rel="canonical" href="${escape(siteUrl)}"><meta property="og:url" content="${escape(siteUrl)}">` : '';
    const structured = JSON.stringify({'@context':'https://schema.org','@type':'ProfilePage', ...(siteUrl ? {url:siteUrl} : {}),mainEntity:{'@type':'Person',name:channel.name,sameAs:[channel.url],description:channel.description}}).replace(/</g,'\\u003c');
    return html.replace('<!-- SITE_METADATA -->', metadata + `<script type="application/ld+json">${structured}</script>`)
      .replaceAll('{{CHANNEL_URL}}',escape(channel.url)).replaceAll('{{SUBSCRIBE_URL}}',escape(channel.subscribeUrl))
      .replaceAll('{{STREAMS_URL}}',escape(channel.streamsUrl)).replaceAll('{{PLAYLISTS_URL}}',escape(channel.playlistsUrl))
      .replaceAll('{{NAME}}',escape(channel.name)).replaceAll('{{DESCRIPTION}}',escape(channel.description))
      .replaceAll('{{AVATAR}}',escape(channel.avatar)).replaceAll('{{YEAR}}',String(new Date().getFullYear()))
      .replace('<!-- FEATURED_VIDEO -->',videos.length ? videoCard(videos[0],true) : '')
      .replace('<!-- VIDEO_CARDS -->',videos.map(v=>videoCard(v)).join(''))
      .replace('<!-- PLAYLIST_CARDS -->',playlists.map(p=>`<a class="playlist-link" href="${escape(p.url)}">${escape(p.title)} <span>↗</span></a>`).join(''))
      .replaceAll('{{EMPTY_HIDDEN}}',videos.length ? 'hidden' : '')
      .replaceAll('{{FEATURED_HIDDEN}}',videos.length ? 'hidden' : '');
  }}]
});

# Abhiyukth Vlogs

A responsive English-language creator website with a procedural Three.js controller and camera, purple/cyan lighting, video collection, accessible player, and a CSS 3D Subscribe button.

## Run locally

Requires Node.js 22.12+ or 24 and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/abhiyukth-vlogs/. The verified local session uses `npm run dev -- --port 5187 --strictPort` at http://127.0.0.1:5187/abhiyukth-vlogs/. Build with `npm run check` followed by `npm run build`. Preview the production build with `npm run preview`, at http://127.0.0.1:4173/abhiyukth-vlogs/.

## Edit content

All channel links, description, avatar, social links, video records, and playlist records live in `src/data/channel.js`. Rebuild after editing. The Vite plugin writes video links and content into HTML so they work without JavaScript. Keep original Malayalam titles exactly as published.

YouTube's public channel fetch was throttled on October 4, 2026. No video ownership, exact titles, avatar, playlist titles, or active broadcast status could be verified. Video and playlist arrays are deliberately empty. The site uses original AV artwork and working links supplied in the brief. There are no invented video IDs, statistics, thumbnails, or live claims.

To add a video, verify its ownership on the public channel page and its exact title using YouTube or oEmbed. The oEmbed endpoint is `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json`. Compare `author_url` with the channel's verified identity; do not rely on similar channel names. Store the original title and the returned thumbnail URL.

Each video record requires:

```js
{
  id: /* actual verified 11-character ID */,
  title: /* exact original title */,
  category: /* Gaming, Vlogs, or Live Replays */,
  thumbnail: /* verified HTTPS thumbnail or ./assets/local-file */,
  verifiedChannelUrl: channel.url,
  verifiedAt: /* ISO date */,
  verificationSource: /* public channel/video URL */
}
```

Use 6–9 verified records for the initial collection. The first record becomes the featured video. Playlist records require `title`, `url`, and `verificationSource`. Run `npm run check` before building. Verification occurs during editing, never through browser-side scraping.

Replace `public/assets/av-mark.svg` or set `channel.avatar` to a local asset. It is reused in the branding and About section. The favicon can be replaced independently in `index.html`. Supply other social links as `{label, url}` entries in `channel.socials`.

## Customize the design and 3D scene

Colors are CSS custom properties in `src/styles.css`. `src/scene.js` constructs the controller, camera, play symbol, orbital rings, and particles from geometry. Adjust shapes, object positions, materials, and lighting there. Gaming/Vlogs controls change the dominant object and lighting. Horizontal dragging rotates the composition while `touch-action: pan-y` preserves vertical scrolling.

The scene loads near the viewport, caps pixel ratio, uses fewer particles on mobile, and pauses while offscreen or when the tab is hidden. Reduced-motion mode removes continuous movement and parallax. A local SVG fallback stays visible if JavaScript or WebGL fails. There are no paid assets or API credentials. Google Fonts are optional; system fallbacks work offline.

## Video player

Static preview links work without JavaScript. With JavaScript, clicks open a native modal and create a privacy-enhanced YouTube iframe only after interaction. The player includes a title, close button, Escape handling, focus containment/restoration, and a permanent YouTube fallback. Closing removes the iframe to stop playback. Restricted embeds cannot always be detected across origins; the direct YouTube link remains available.

## GitHub Pages

The default asset base is `/abhiyukth-vlogs/`. Override it with `VITE_BASE_PATH` for a differently named repository. Configure the actual website address in `channel.siteUrl` or the build environment's `SITE_URL`. Leave it blank until an address is known; the site deliberately omits canonical and `og:url` tags in that case.

1. Create a new public repository `abhiyukth-vlogs` without overwriting any existing project.
2. Commit this project and `package-lock.json` to its `main` branch.
3. In Settings → Pages, choose **GitHub Actions** as Source.
4. Push to `main` or manually run **Deploy to GitHub Pages**.
5. Check the deployment job's returned URL and inspect the published page.

`.github/workflows/deploy.yml` uses official Pages actions, `npm ci`, content validation, production build, artifact upload, and deployment. The Pages action supplies the actual canonical address at build time. Required workflow permissions are `contents: read`, `pages: write`, and `id-token: write`.

The user selected the available authenticated `Abhiyukth-vlogs` account for publishing. GitHub returned https://abhiyukth-vlogs.github.io/abhiyukth-vlogs/ as its Pages address. Repository: https://github.com/Abhiyukth-vlogs/abhiyukth-vlogs. See `VERIFICATION.md` for checks and publishing status.

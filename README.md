# Parachute ReCool

`ParachuteReCoolFinal` is the new full-frame editorial film, made entirely in Remotion: 1920×1080, 30 FPS, exactly 180 seconds. Its twelve scenes use layered photographic assets, a connected SVG science sequence, the original uploaded packaging and one combined logo. Essential content stays right of the leftmost 575 pixels. The current master is silent for live speakers.

```sh
npm ci
npm run studio
npm run check:final
npm run render:final
```

The MP4 writes to `out/parachute-recool-final.mp4`. Node 22+, FFmpeg/ffprobe and Chromium are required. `remotion.config.ts` uses system Chromium when available. Dependencies are pinned in the lockfile.

The new production lives in `src/editorial/`. `design.ts` centralizes timing, palette and motion. `Lifestyle.tsx`, `Explanation.tsx` and `Commerce.tsx` implement the story, science and business sequences. `Film.tsx` assembles the edit and optional supplied audio.

Narration cues and financial figures come from the approved material in `src/data/`. The repository specifies Year 3 net sales of ৳17.22 crore and EBITDA of ৳2.58 crore. Working pack prices are ৳175/৳275. Annual retail TAM is the pitch's assumption-based ৳1,189 crore estimate; no missing demographic or usage assumptions were invented. Scientific diagrams illustrate intended cooling-agent availability and sensory response rather than measured temperature changes.

The original bottle PNGs, combined logo and supplied footage remain byte-identical. CSS trims transparent asset margins for composition. The source footage contributes its reviewed 7.2–11.867-second spray interval, followed by a 20-frame hold. Newly generated lifestyle photographs and the retained generated macro texture are illustrative production assets. Both uploaded visual references are preserved in `docs/references/` for editing.

No substitute narration or default captions are generated. Optional audio files in `public/assets/` are indexed by `npm run assets`. Earlier local projects and exports remain available separately; the new composition and source archive use no Blender assets or scripts.

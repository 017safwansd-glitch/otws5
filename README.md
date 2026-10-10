# Parachute ReCool — motion pitch

180 seconds · 1920×1080 · 30 fps · landscape.

43 short choreographed shots use kinetic typography, animated sweat and evaporation, moisture-responsive particles, liquid reveals, product mockups and animated business figures. The narration retains the proposed-formula and assumption-based forecast qualifications. There are no persistent headers, footers, presenter labels or interview placeholder.

The original seven-second interview slot is replaced with: “The relief fades. The discomfort returns. And your afternoon is still ahead of you.”

Audio includes synthetic presenter voices and an original quiet procedural music bed. Product packs are concept mockups. This is a pitch visualization, not evidence of tested cooling performance. See SOURCES.md.

## Edit and render

Install Node.js and use `npm install`. Run `npm run dev` for the local HyperFrames editor, `npm run check` to validate, and `npm run render -- --output renders/Parachute-ReCool-motion.mp4 --fps 30 --quality high` to export.

The editable composition is index.html. shots.json describes the visual shot timings; script.json contains the narration timings. Fonts, GSAP, images and audio are bundled in assets/. All animation is on a paused, registered GSAP timeline for deterministic rendering.

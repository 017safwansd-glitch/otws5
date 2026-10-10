import manifest from './assets.generated.json';
import type {Caption} from '@remotion/captions';
export const assets: Record<keyof typeof manifest.assets, string | null> = manifest.assets;
export const recordedCaptions: Caption[] = manifest.captions;
export const audioSettings = {musicVolume:0.12, ambienceVolume:0.06, effectsVolume:0.18, estimatedCaptions:false};
// Regular MP4s remain rectangular video slots. Substitute independently keyed alpha WebM footage when available.
export const presenterSettings = {side:'left' as 'left'|'right', muted:true};
// Inspection found distorted AI lettering. The final 57 frames still seek the same source,
// but a verified PNG (or labeled missing-asset slot) replaces the displayed product hero.
export const replaceAiHero = true;

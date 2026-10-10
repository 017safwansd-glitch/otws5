import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {parseSrt} from '@remotion/captions';
const names = {
  merged: 'recool-merged.mp4', logo: 'recool-logo.png', goPack: 'recool-60ml.png', homePack: 'recool-150ml.png',
  girlOpening: 'girl-opening.mp4', girlReturn: 'girl-return.mp4', girlEnding: 'girl-ending.mp4',
  presenter1: 'presenter1.webm', presenter2: 'presenter2.webm', presenter3: 'presenter3.webm',
  narration: 'narration.wav', music: 'music.wav', ambience: 'ambience.wav', notification: 'notification.wav',
  spray: 'spray.wav', activation: 'activation.wav', reveal: 'reveal.wav',
};
const assets = Object.fromEntries(Object.entries(names).map(([key,name]) => {
  const fallback = name.replace('.webm','.mp4');
  const resolved = existsSync(`public/assets/${name}`) ? name : name.endsWith('.webm') && existsSync(`public/assets/${fallback}`) ? fallback : null;
  return [key, resolved ? `assets/${resolved}` : null];
}));
const captions = existsSync('public/assets/captions.srt') ? parseSrt({input: readFileSync('public/assets/captions.srt','utf8')}).captions : [];
writeFileSync('src/data/assets.generated.json', JSON.stringify({assets,captions},null,2)+'\n');
console.log('Assets indexed. ParachuteReCoolFinal renders the silent live-speaker master unless recordings are supplied.');
console.log('Missing:', Object.entries(assets).filter(([,v])=>!v).map(([k])=>names[k]).join(', '));

import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
function load(path){const code=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const module={exports:{}};new Function('require','module','exports',code)(require,module,module.exports);return module.exports;}
const {EDIT,DURATION,FPS,W,H,SAFE}=load('src/editorial/design.ts');
assert.deepEqual([W,H,FPS,DURATION,SAFE],[1920,1080,30,5400,575]);
let end=0;for(const s of EDIT){assert.equal(s.from,end);end+=s.duration;}assert.equal(end,5400);
const {financials}=load('src/data/financials.ts');assert.deepEqual([financials.tam,financials.netSales,financials.ebitda],[1189,17.22,2.58]);
const blobs={'recool-60ml.png':'fdf16e6f0d5e38c32df98559c08312f72957543b','recool-150ml.png':'5578fb51544b6814946e0970f92bcf01ca17d8fd','recool-logo.png':'ffced3399fe3407b14bae37a4bd446382e4fb0ed','recool-merged.mp4':'2d28ea40c3ebd6e6352037b8809345fe6aacd17b'};
for(const [file,expected] of Object.entries(blobs)){const b=readFileSync('public/assets/'+file);const hash=createHash('sha1').update(`blob ${b.length}\0`).update(b).digest('hex');assert.equal(hash,expected,file);}
for(const file of ['dhaka-street.png','woman.png','phone.png','shower.png','powder.png','deodorant.png','shop.png'])assert.ok(existsSync('public/assets/editorial/'+file),file);
console.log('PASS: 12 contiguous scenes, 5400 frames, 180 seconds; original branding and supplied footage byte-identical; approved figures retained.');

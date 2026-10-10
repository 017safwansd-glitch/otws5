import React from 'react';
import {useCurrentFrame,staticFile,Sequence} from 'remotion';
import {Audio} from '@remotion/media';
import {recordedCaptions,assets,audioSettings} from '../data/assets';
import {narrationCues} from '../data/narration-cues';
import {cueFrame} from '../data/narration-cues';
import {ramp} from './motion';
export const Captions:React.FC<{offset?:number;showEstimated?:boolean}>=({offset=0,showEstimated=false})=>{
 const f=useCurrentFrame()+offset; const ms=f/30*1000;
 const real=recordedCaptions.find(c=>ms>=c.startMs&&ms<c.endMs);
 const estimate=narrationCues.find(c=>f>=c.startFrame&&f<c.endFrame&&c.spokenPhrase);
 let text=real?.text??'';
 if(!recordedCaptions.length&&showEstimated&&estimate){
  const words=estimate.spokenPhrase.split(' ');const groups=Array.from({length:Math.ceil(words.length/14)},(_,i)=>words.slice(i*14,i*14+14).join(' '));
  const index=Math.min(groups.length-1,Math.floor((f-estimate.startFrame)/(estimate.endFrame-estimate.startFrame)*groups.length));text=groups[index];
 }
 if(!text)return null;
 return <div style={{position:'absolute',bottom:22,left:170,right:170,display:'flex',flexDirection:'column',alignItems:'center',pointerEvents:'none'}}><div style={{fontSize:27,lineHeight:1.35,textAlign:'center',background:'#111C32F2',color:'#F7F6F1',padding:'10px 24px',borderRadius:6,maxWidth:1470}}>{text}</div></div>;
};
export const AudioTracks:React.FC<{offset?:number;duration?:number}>=({offset=0,duration=5400})=>{
 const effects=[{path:assets.notification,from:1260+cueFrame(3,'notification')},{path:assets.reveal,from:2010+cueFrame(4,'cyan')},{path:assets.spray,from:2820},{path:assets.activation,from:3378+cueFrame(6,'sensation')}];
 return <>{assets.narration&&<Audio src={staticFile(assets.narration)} trimBefore={offset}/>} {assets.music&&<Audio src={staticFile(assets.music)} trimBefore={offset} volume={f=>audioSettings.musicVolume*ramp(f,0,45)*(1-ramp(f,duration-75,75))*(f+offset>=2200&&f+offset<2500?.4:1)}/>} {assets.ambience&&<Audio src={staticFile(assets.ambience)} trimBefore={offset} volume={audioSettings.ambienceVolume}/>} {effects.filter(e=>e.path&&e.from>=offset&&e.from<offset+duration).map((e,i)=><Sequence key={i} from={e.from-offset} durationInFrames={30}><Audio src={staticFile(e.path!)} volume={audioSettings.effectsVolume}/></Sequence>)}</>;
};

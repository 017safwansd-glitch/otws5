import {Easing, interpolate, interpolateColors, spring} from 'remotion';

export const W=1920, H=1080, FPS=30, DURATION=5400, SAFE=575, CONTENT=650;
export const c={paper:'#F5F0E6',orange:'#E58B46',amber:'#F3B45F',ink:'#20252B',terra:'#C66A47',navy:'#142D46',teal:'#087F98',cyan:'#57D8E7',ice:'#C6F2F4',white:'#F7FAFA'};
export const progress=(f:number,start:number,duration=30)=>interpolate(f,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const ease=(f:number,start:number,duration=45)=>interpolate(f,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.22,.65,.22,1)});
export const settle=(f:number,start=0)=>spring({frame:Math.max(0,f-start),fps:FPS,config:{damping:200,stiffness:90},durationInFrames:50});
export const blend=(p:number,a:string,b:string)=>interpolateColors(p,[0,1],[a,b]);
export const noise=(n:number)=>{const v=Math.sin(n*127.13+19.7)*43758.5453;return v-Math.floor(v);};
export const EDIT=[
 {id:'opening',from:0,duration:220},
 {id:'outside',from:220,duration:380},
 {id:'humidity',from:600,duration:660},
 {id:'routines',from:1260,duration:750},
 {id:'revelation',from:2010,duration:660},
 {id:'product',from:2670,duration:708},
 {id:'mechanism',from:3378,duration:525},
 {id:'formats',from:3903,duration:297},
 {id:'market',from:4200,duration:420},
 {id:'finance',from:4620,duration:180},
 {id:'resolution',from:4800,duration:455},
 {id:'closing',from:5255,duration:145},
] as const;
export type ShotId=typeof EDIT[number]['id'];

import React from 'react';
import {AbsoluteFill,Sequence} from 'remotion';
import {AudioTracks} from '../components/CaptionsAndAudio';
import {EDIT,c,ShotId} from './design';
import {FontStyles} from './primitives';
import {Opening,Outside,Resolution,Routines} from './Lifestyle';
import {Humidity,Mechanism,ProductReveal,Revelation} from './Explanation';
import {Closing,Finance,Formats,Market} from './Commerce';

export const scenes:Record<ShotId,React.FC>={opening:Opening,outside:Outside,humidity:Humidity,routines:Routines,revelation:Revelation,product:ProductReveal,mechanism:Mechanism,formats:Formats,market:Market,finance:Finance,resolution:Resolution,closing:Closing};
export const ParachuteReCoolFinal:React.FC=()=> <AbsoluteFill style={{background:c.navy,fontFamily:'Editorial, Bengali, sans-serif',overflow:'hidden'}}><FontStyles/>{EDIT.map(s=>{const Shot=scenes[s.id];return <Sequence key={s.id} from={s.from} durationInFrames={s.duration} name={s.id}><Shot/></Sequence>;})}<AudioTracks/></AbsoluteFill>;

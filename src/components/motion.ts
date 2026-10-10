import {interpolate, spring} from 'remotion';
export const ramp = (frame:number, start:number, duration=25) => interpolate(frame,[start,start+duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const settle = (frame:number,start=0) => spring({frame:Math.max(0,frame-start),fps:30,config:{damping:200},durationInFrames:36});
export const enter = (frame:number,start=0) => ({opacity:ramp(frame,start,18),transform:`translateY(${(1-settle(frame,start))*24}px)`});

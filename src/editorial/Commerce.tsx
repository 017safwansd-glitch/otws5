import React from 'react';
import {useCurrentFrame} from 'remotion';
import {financials} from '../data/financials';
import {c,ease,H,noise,progress,W} from './design';
import {Brand,Pack,PathDraw,Text,World} from './primitives';
import {ProductHero} from './Explanation';

export const Formats:React.FC=()=>{
 const f=useCurrentFrame();const first=ease(f,0,50),second=ease(f,40,60);
 return <World paper><svg width={W} height={H} style={{position:'absolute',inset:0}}><path d="M1040 1080Q1120 550 1390 0H1920V1080Z" fill="#D9EBE4"/><ellipse cx="1160" cy="852" rx="155" ry="25" fill="#455E52" opacity=".1"/><ellipse cx="1580" cy="873" rx="180" ry="27" fill="#455E52" opacity=".12"/><PathDraw d="M900 435H1030L1080 482" at={55} color={c.teal} width={2}/></svg><div style={{position:'absolute',left:1080+(1-first)*95,top:225,opacity:first}}><Pack size={60} width={160}/></div><div style={{position:'absolute',left:1480+(1-second)*90,top:115,opacity:second}}><Pack size={150} width={205}/></div><Text x={745} y={350} size={45} at={35}>60 ml</Text><Text x={745} y={409} size={31} color={c.teal} at={55}>Go Pack</Text><Text x={745} y={525} size={87} weight={700} at={92} width={330}>৳175</Text><Text x={1430} y={863} size={34} color={c.teal} at={115} width={380}>150 ml · Home Pack</Text><Text x={1430} y={923} size={84} weight={700} at={197} width={350}>৳275</Text></World>;
};
export const Market:React.FC=()=>{
 const f=useCurrentFrame(),gather=ease(f,75,70),route=ease(f,300,45);
 return <World cool><svg width={W} height={H} style={{position:'absolute',inset:0}}>{Array.from({length:160},(_,i)=>{
  const left=i<80,j=i%80;const gx=(left?790:1360)+(j%10)*43,gy=345+Math.floor(j/10)*48;
  const angle=i/160*Math.PI*2,r=310+(i%3)*16;
  const tx=1270+Math.cos(angle)*r*1.45,ty=570+Math.sin(angle)*r;
  return <circle key={i} cx={gx+(tx-gx)*gather} cy={gy+(ty-gy)*gather} r={5.5} fill={i%5?c.ice:c.cyan} opacity={(.42+noise(i)*.35)*(1-route)}/>;
 })}{f>=300&&<><PathDraw d="M1160 550H1320L1450 425M1320 550L1450 650M1320 550L1450 850" at={300} width={3} color={c.cyan}/>{[425,650,850].map((y,i)=><g key={y} opacity={ease(f,315+i*10,30)}><path d={`M1450 ${y-20}l82 -45 82 45v92h-164Z`} fill="#5F8890"/><path d={`M1472 ${y}h118v62h-118Z`} fill="#C6E2DE"/><path d={`M1510 ${y}v62M1560 ${y}v62`} stroke="#5F8890" strokeWidth="4"/></g>)}</>}</svg>{f<75?<><Text x={790} y={240} size={38} color={c.white}>Dhaka</Text><Text x={1360} y={240} size={38} color={c.white} at={15}>Chattogram</Text><Text x={775} y={810} size={29} color={c.ice} at={10}>Launch markets</Text></>:f<300?<><Text x={990} y={462} size={112} weight={700} color={c.white} at={90} width={650}>৳1,189</Text><Text x={1030} y={599} size={38} color={c.ice} at={110} width={700}>crore per year</Text><Text x={795} y={130} size={31} color={c.ice} at={75} width={990}>Bangladesh annual retail potential</Text><Text x={1000} y={763} size={25} color={c.ice} at={130} width={700}>Assumption-based TAM estimate</Text></>:<><div style={{position:'absolute',left:765,top:325,opacity:route}}><Brand width={365}/></div><Text x={770} y={710} size={30} color={c.ice} at={310} width={420}>Brand familiarity</Text><Text x={1360} y={235} size={36} color={c.white} at={310} width={430}>Marico distribution</Text></>}</World>;
};
export const Finance:React.FC=()=>{
 const f=useCurrentFrame(),sales=ease(f,0,60),profit=ease(f,95,48),unit=50;
 return <World paper><Text x={745} y={140} size={35}>Year 3 projections</Text><svg width={W} height={H} style={{position:'absolute',inset:0}}><path d="M760 810H1760" stroke="#879085" strokeWidth="2"/>{[0,5,10,15,20].map(n=><g key={n}><path d={`M${760+n*unit} 810v15`} stroke="#879085" strokeWidth="2"/><text x={760+n*unit} y="870" textAnchor="middle" fontSize="27" fill="#626C64">{n}</text></g>)}<path d={`M760 444H${760+financials.netSales*unit*sales}`} stroke={c.teal} strokeWidth="100"/><path d={`M760 726H${760+financials.ebitda*unit*profit}`} stroke={c.orange} strokeWidth="100"/></svg><Text x={760} y={280} size={32}>Net sales</Text><Text x={1250} y={270} size={71} weight={700} at={15} width={560}>৳{financials.netSales.toFixed(2)} crore</Text><Text x={760} y={571} size={32} at={95}>EBITDA</Text><Text x={1030} y={680} size={62} weight={700} at={95} width={720}>৳{financials.ebitda.toFixed(2)} crore</Text><Text x={1590} y={925} size={25} color="#626C64" width={220}>crore taka</Text></World>;
};
export const Closing:React.FC=()=>{const f=useCurrentFrame();return <ProductHero frame={f+25} closing/>;};

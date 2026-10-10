import React from 'react';
import {Composition} from 'remotion';
import {ParachuteReCoolFinal} from './editorial/Film';
import {DURATION,FPS,H,W} from './editorial/design';
export const Root:React.FC=()=> <Composition id="ParachuteReCoolFinal" component={ParachuteReCoolFinal} width={W} height={H} fps={FPS} durationInFrames={DURATION}/>;

export const FPS = 30;
export const DURATION = 5400;
export const SCENES = [
  {id:1, from:0, duration:600, title:'An ordinary afternoon', presenter:null},
  {id:2, from:600, duration:660, title:'The discomfort follows', presenter:1},
  {id:3, from:1260, duration:750, title:'Relief has its conditions', presenter:null},
  {id:4, from:2010, duration:660, title:'A different way to ask', presenter:2},
  {id:5, from:2670, duration:708, title:'The cooling formulation', presenter:null},
  {id:6, from:3378, duration:525, title:'When moisture returns', presenter:null},
  {id:7, from:3903, duration:57, title:'Product transition', presenter:null},
  {id:8, from:3960, duration:840, title:'The opportunity', presenter:3},
  {id:9, from:4800, duration:600, title:'The afternoon continues', presenter:null},
] as const;
export const VIDEO_SEGMENTS = [{from:2670, duration:708, trimBefore:0},{from:3903,duration:57,trimBefore:708}];

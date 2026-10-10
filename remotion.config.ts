import {Config} from '@remotion/cli/config';
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

import {existsSync} from 'node:fs';
if (process.env.REMOTION_BROWSER_EXECUTABLE) Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
else if (existsSync('/usr/bin/chromium')) Config.setBrowserExecutable('/usr/bin/chromium');

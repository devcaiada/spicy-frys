import {Config} from '@remotion/cli/config';

Config.setOverwriteOutput(true);
Config.setVideoImageFormat('jpeg');
Config.setConcurrency(2);
Config.setDelayRenderTimeoutInMilliseconds(90000);
Config.setChromiumOpenGlRenderer('angle');

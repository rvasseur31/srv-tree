import { production } from './production';
import { development } from './development';
import { Environment } from './environment.interface';
const nodeEnv = "development";

const configurations = {
 development,
 production
};

export const config: Environment = configurations[nodeEnv];

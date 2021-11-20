import { readFileSync, writeFileSync } from 'fs';
import flowchartElements from './flowchart-elements.js';

const loggerFile = '../../../mdx-show/::1-debug.log';
const elementsFile = '../../../debug/flowchart-elements.json';

const log = readFileSync(loggerFile, 'utf8');

const elements = flowchartElements(log);

writeFileSync(elementsFile, JSON.stringify(elements), 'utf-8');

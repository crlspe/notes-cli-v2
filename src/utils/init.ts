import welcome from 'cli-welcome';
import { cli } from './cli';
const pkg = require('../../package.json');
const { clear } = cli.flags;

export function init() {
	welcome({
		title: `notes-cli`,
		tagLine: `by Rafael Lopez`,
		// description: pkg.description,
		version: pkg.version,
		bgColor: '#36BB09',
		color: '#000000',
		bold: true,
		clear: clear
	});
};
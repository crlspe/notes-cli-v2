import { cli } from "../utils/cli";
const { debug } = cli.flags;

export function log(...info: Array<any> ){
    debug && info.forEach(log => { console.table(log) });
}
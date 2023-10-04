#!/usr/bin/env node

import { CommandHandler } from './handlers/command-handler';
import { cli } from './utils/cli';
import { init } from './utils/init';
import { log } from './utils/log';

(async () => {
    init();
    log("CLI Flags:", cli.flags, "CLI Input:", cli.input);
    const commandHandler = new CommandHandler();
    commandHandler.handle();
})();
#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_handler_1 = require("./handlers/command-handler");
const cli_1 = require("./utils/cli");
const init_1 = require("./utils/init");
const log_1 = require("./utils/log");
(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, init_1.init)();
    (0, log_1.log)("CLI Flags:", cli_1.cli.flags, "CLI Input:", cli_1.cli.input);
    const commandHandler = new command_handler_1.CommandHandler();
    commandHandler.handle();
}))();

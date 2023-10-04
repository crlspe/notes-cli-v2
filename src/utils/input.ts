import inquirer from "inquirer";
import { cli } from "./cli";

export class CliInput {
	static getIds() : Array<number> {
		return [].concat(cli.flags.id);
	}

    static async askIfNull(input : string, message : string) {
		input = input === null || input === undefined ? '' : input.toString();
		let value = input || (await inquirer.prompt({
            type: 'input',
            name: 'value',
            message
        })).value;
		return value.trim();
	}

	static async ask(message : string) {
		return (await inquirer.prompt({
            type: 'input',
            name: 'value',
            message
        })).value.trim();
	}

	static async askList(index : number, message : string) : Promise<Array<string>> {
		const inputs : Array<string> = cli.input.slice(index)
		if (inputs.length > 0) return inputs;
		let content = "";
        do {
            content = await this.ask(message);
			content && inputs.push(content);
		} while (content);
		return inputs;
	}
}
import yargs, { boolean, string } from 'yargs';

const options = {
	clear: {
		boolean: true,
		default: true,
		desc: `Clear the console`
	},
	debug: {
		boolean: true,
		alias: `d`,
		desc: `Print debug info`
	},
	note: {
		boolean: true,
		alias: `n`,
		desc: `Note Item`
	},
	task: {
		boolean: true,
		alias: `t`,
		desc: `Task Item`
	},
	clip: {
		boolean: true,
		default: false,
		alias: `c`,
		desc: `Use Clipboard as Input`
	},
	add: {
		boolean: true,
		alias: `a`,
		desc: `Add an Item`
	},
	append: {
		boolean: true,
		alias: `A`,
		desc: `Append content`
	},
	replace: {
		boolean: true,
		alias: `R`,
		desc: `Replace content`
	},
    remove: {
		boolean: true,
		alias: `r`,
		desc: `Remove Item(s)`
	},
	search: {
		boolean: true,
		alias: `s`,
		desc: `Search text in Item(s)`
	},
	selectId: {
		boolean: true,
		alias: `i`,
		desc: `Select Items by Id(s)`
	},
	update: {
		boolean: true,
		alias: `u`,
		desc: "Change Item Type"
	},
	check: {
		boolean: true,
		alias: `X`,
		desc: `Set a task as completed`
	},

	uncheck: {
		boolean: true,
		alias: `O`,
		desc: `Set a task as not completed`
	},
	chain: {
		boolean: false,
		choices: ["append", "add", "replace", "remove", "toTask", "toNote", "update", "check", "uncheck"],
		alias: `h`,
		desc: "Chain to a Command"
	},
	// OUTPUTS
	console: {
		boolean: true,
		default: true,
		desc: `Console Out Results`
	},
	clipboard: {
		boolean: true,
		alias: `C`,
		desc: `Paste Results to Clipboard`
	},
	
	output: {
		boolean: true,
		alias: `o`,
		desc: `Output content to File`
	},
	fileName: {
		boolean: false,
		alias: `f`,
		desc: `Set File Name`
	}

};

const argv : { [key: string]: any } = yargs.options(options).argv;

let input = argv._
let flags = {...argv};

delete flags._;
delete flags.$0;

const cli = {
	input,
	flags,
	argv
}

export { cli }
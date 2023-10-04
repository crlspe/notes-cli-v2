export class CliFormat {
    static formatDate(date : number) {
		return new Date(date).toLocaleString();
	}

	static formatContent(content : string, trunc : number) {
		content = this.removeAnnotations(content);
		content = content.toString().trim();
		content = this.truncate(content, trunc);
		return content;
	}

	static truncate(value : string, trunc : number) {
		if (value.length > trunc) {
			value = `${value.substring(0,trunc)} ...(${value.length})`;
		}
        return value;
	}

	static getScopes(content : string) : Array<string>{
		const regex = /(?:^|\s)(@([a-zA-Z_$][a-zA-Z0-9_$.-]*))(?=\s|$)/gm;
		const matches = content.match(regex) || [];
		const scopes = matches.map(match => match.trim().slice(1));
		return scopes;
	}

	static getTags(content: string) : Array<string>{
		const regex = /(?:^|\s)(#([a-zA-Z_$][a-zA-Z0-9_$.-]*))(?=\s|$)/gm;
		const matches = content.match(regex) || [];
		const tags = matches.map(match => match.trim().slice(1));
		return tags;
	}

	static removeTags(content : string) : string {
		for (const tag of this.getTags(content)) {
			content = content.replace(`#${tag}`, '');
		}
		return content;
	}

	static removeScopes(content : string) : string {
		content = content.slice();
		for (const scope of this.getScopes(content)) {
			content = content.replace(`@${scope}`, '');
		}
		return content;
	}

	static removeAnnotations(content : string) : string {
		content = content.trim();
		content = this.removeScopes(content);
		content = this.removeTags(content);
		return content;
	}
}
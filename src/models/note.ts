import { CliFormat } from "../utils/format";
export class Note {

    public id : number = Date.now(); 
    public content : string = "";
	public type : string;
    public created : number = Date.now();

	constructor(content: string) {
        this.content = content;
		this.type = "note";
	}

	getJSON() {
		return {
            id: this.id,
            type: this.type,
            content: this.content,
            created: this.created
        };
	}

	formatedJSON(truncContentAt = 20) : Object {
		return {
            id: this.id,
            content: CliFormat.formatContent(this.content.toString(), truncContentAt),
			scopes: CliFormat.getScopes(this.content.toString()).join(', '),
			tags: CliFormat.getTags(this.content.toString()).join(', '),
            created: CliFormat.formatDate(this.created)
        };
	}
 }

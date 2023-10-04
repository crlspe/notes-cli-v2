"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const format_1 = require("../utils/format");
class Note {
    constructor(content) {
        this.id = Date.now();
        this.content = "";
        this.created = Date.now();
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
    formatedJSON(truncContentAt = 20) {
        return {
            id: this.id,
            content: format_1.CliFormat.formatContent(this.content.toString(), truncContentAt),
            scopes: format_1.CliFormat.getScopes(this.content.toString()).join(', '),
            tags: format_1.CliFormat.getTags(this.content.toString()).join(', '),
            created: format_1.CliFormat.formatDate(this.created)
        };
    }
}
exports.Note = Note;

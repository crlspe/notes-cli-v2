import { BaseCommand } from "./base-command";

export class SearchCommand extends BaseCommand { 

    async execute(terms: string[]): Promise<any[]> {
        
        if (terms.length == 0) {
            this._results = this._noteHandler.getAll();
        }

        terms.forEach(text => {
            const searchResults = this._noteHandler.searchByText(text);
            this._results = this._results.filter(x => searchResults.every(result => result.id !== x.id));
            this._results = this._results.concat(searchResults);
        }); 

        return await super.execute(terms);
    }
}
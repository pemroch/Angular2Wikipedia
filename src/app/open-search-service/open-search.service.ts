import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class OpenSearchService {

    constructor(private jsonp: Jsonp) { }
    
    search (searchTerm: string) {
        let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        let queryString = `?search=${searchTerm}&action=opensearch&format=json&callback=JSONP_CALLBACK`;
        return this.jsonp.get(wikiUrl + queryString)
        .map(response => response.json()[1])
        .catch(this.handleError);
    }

    private handleError (error: Response | any) {
         return Observable.throw(error);
    }

}

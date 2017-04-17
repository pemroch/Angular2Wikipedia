import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { OpenSearchService } from '../open-search-service/open-search.service';

@Component({
    selector: 'app-search-component',
    templateUrl: './search-component.component.html',
    styleUrls: ['./search-component.component.css'],
    providers: [ OpenSearchService ]
})

export class SearchComponentComponent {
    
    items: Observable<string[]>;

    constructor(public openSearchService: OpenSearchService) { }

    searchTerm (searchForm: NgForm) {
        this.items = this.openSearchService.search(searchForm.value.search);
    }

}
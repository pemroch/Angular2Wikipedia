import { Component } from '@angular/core';
import { LoadArticleService } from '../load-article-service/load-article.service';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-article-component',
    templateUrl: './article-component.component.html',
    styleUrls: ['./article-component.component.css'],
    providers: [ LoadArticleService ]
})

export class ArticleComponentComponent {
    
    title: string;
    description: string;
    sections: any[];
    activeSections = [];

    constructor(
        public loadArticleService: LoadArticleService,
        public route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.params
        .switchMap(
            (params: Params) => 
            this.loadArticleService.load(params.title))
        .subscribe(res => {
            this.title = res.title;
            this.description = res.description;
            this.sections = res.sections;
        });        
    }

    elementClicked($event, section, index) {
        let elObj = {
            levels: section.levels,
            text: $event.target.innerText
        };
        $event.target.className = ($event.target.className === 'active') ? '' : 'active';
        if ($event.target.className === 'active') {
            this.activeSections.push(elObj)
        } else {
            let arrIndex = this.activeSections.findIndex(function findObj(element, i, arr) {
                return element.text === elObj.text;
            });
            this.activeSections.splice(arrIndex, 1);
        }
        console.log(this.activeSections)
    }

}

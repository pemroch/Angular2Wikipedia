import { Injectable } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class LoadArticleService {

    constructor(private jsonp: Jsonp) { }
    
    load (title) {
        /* loads the wikipedia article for the title picked from open search.*/
        return this.jsonp.get( `https://en.wikipedia.org/w/api.php?action=mobileview&format=json&page=${title}&sections=all&prop=text|sections|normalizedtitle|hasvariants|displaytitle|pageprops|description&pageprops=*&sectionprop=toclevel|level|line|number|index|fromtitle|anchor&redirect=yes&formatversion=2&callback=JSONP_CALLBACK`)
        .map((res: Response) => {
            let mobileview = res.json().mobileview;
            /* sets 'sections' to the sections array sent back from the json request. */
            let sections = mobileview.sections;
            let sectionsLength: number = mobileview.sections.length
            /* Object that will return our entire content to the component */
            let returnObj = {
                title: mobileview.displaytitle || '',
                description: mobileview.description || '',
                sections: null
            };
            /* an empty object to store titles of each section organized by their table of content level for each section in the sections array. */
            var levels = {};
            /* an empty array to push each section from the sections array with the corresponding table of content levels. */
            let sectionsArr = [];
            /* for loop that will loop through each section in the sections array, get the table of content level and push an object containing
             the table of content levels with the html text. */
            for(let section = 0; section < sectionsLength; section++) {
                /* First item in sections array usually does not contain a table of content level, but does contain html text, so we make a 'table of content level' 
                containing the search title ('display title') for level1. If none exist then we set it to an empty string and push it into sectionsArr*/
                if(!sections[section].toclevel && sections[section].text) {
                    sectionsArr.push({
                        levels: {
                            level1: mobileview.displaytitle || '',
                        },
                        text: sections[section].text
                    })
                }
                /* if the table of contenct is a top level of 1. Set the levels object to an empty object, set levels[level1] 
                 to the name of the table of content title (line), then push  and object containing the table of content levels and the text html for that section. */
                if (sections[section].toclevel === 1) {
                    /* Set levels to an empty object. */
                    levels = {};
                    /* Set levels[level1] to the table of content title (line). */
                    levels['level' + sections[section].toclevel] = sections[section].line;
                    /* Clone levels object to avoid referencing it */
                    let levelsClone = function() {
                        let clone = {};
                        for(let prop in levels) {
                            clone[prop] = levels[prop]
                        }
                        return clone;
                    }
                    /* Push object containing table of content levels and text html into sectionsArr. */
                    sectionsArr.push({
                        levels: levelsClone(),
                        text: sections[section].text
                    });
                }
                if (sections[section].toclevel > 1) {
                    /* If table of content level is greater than one, set levels['level' + table of content level] to the title of the section
                     levels object will now contain level1 title plus current table of content level-title (level2, level3, etc.) */
                    levels['level' + sections[section].toclevel] = sections[section].line;
                    /* Clone levels object to avoid referencing it */
                    let levelsClone = function() {
                        let clone = {};
                        for(let prop in levels) {
                            clone[prop] = levels[prop]
                        }
                        return clone;
                    }
                    /* Push current levels object containing table of content titles into sectionsArr with text html. */
                    sectionsArr.push({
                        levels: levelsClone(),
                        text: sections[section].text
                    });      
                }
            }
            returnObj.sections = sectionsArr;
            return returnObj;
        })
        .catch(this.handleError);
    }

    /* Error Handling */
    private handleError (error: Response | any) {
         return Observable.throw(error);
    }    

}

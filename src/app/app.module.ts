import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { CreateAccountComponentComponent } from './create-account-component/create-account-component.component';
import { SearchComponentComponent } from './search-component/search-component.component';
import { ArticleComponentComponent } from './article-component/article-component.component';

const firebaseDatabase = {
    apiKey: "AIzaSyAsWYz4Jxb6Ma1maGp6GGccg-dD72spw5w",
    authDomain: "clickwik-79428.firebaseapp.com",
    databaseURL: "https://clickwik-79428.firebaseio.com",
    projectId: "clickwik-79428",
    storageBucket: "clickwik-79428.appspot.com",
    messagingSenderId: "94848371232"  
};

const firebaseAuth = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password,  
}

const appRoutes: Routes = [
    { path: 'login', component: LoginComponentComponent },    
    { path: 'create-account', component: CreateAccountComponentComponent },    
    { path: 'search', component: SearchComponentComponent },    
    { path: 'article', component: ArticleComponentComponent },    
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**',  component: LoginComponentComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponentComponent,
        CreateAccountComponentComponent,
        SearchComponentComponent,
        ArticleComponentComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(firebaseDatabase, firebaseAuth),
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }

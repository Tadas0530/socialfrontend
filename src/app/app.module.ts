import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostService } from './services/postservice.service';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PostCategoriesListComponent } from './components/post-categories-list/post-categories-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PostInputBoxComponent } from './components/post-input-box/post-input-box.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
   { path: 'category/:id', component: PostListComponent },
   { path: 'category', component: PostListComponent },
   { path: 'posts', component: PostListComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostCategoriesListComponent,
    PostInputBoxComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule, 
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  exports: [RouterModule],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }

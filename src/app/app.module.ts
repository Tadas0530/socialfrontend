import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PostService } from './services/postservice.service';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostCategoriesListComponent } from './components/post-categories-list/post-categories-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { PostInputBoxComponent } from './components/post-input-box/post-input-box.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpInterceptorService } from './services/http-interceptor-service.service';
import { ErrorComponent } from './components/error/error.component';
import { RouteGuardService } from './services/route-guard.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ExploreCategoriesComponent } from './components/explore-categories/explore-categories.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'search/categories/:keyword', component: ExploreCategoriesComponent },
      { path: 'category/:id', component: PostListComponent },
      { path: 'explore/categories', component: ExploreCategoriesComponent },
      { path: 'category', component: PostListComponent },
      { path: 'posts', component: PostListComponent },
      { path: 'profile/:id', component: UserProfileComponent },
    ],
    canActivate: [RouteGuardService],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostCategoriesListComponent,
    PostInputBoxComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    ErrorComponent,
    UserProfileComponent,
    ExploreCategoriesComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  exports: [RouterModule],
  providers: [
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

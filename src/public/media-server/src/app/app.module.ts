import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { MoviesComponent } from './main/movies/movies.component';
import { MovieComponent } from './main/movies/movie/movie.component';
import { MovieService } from './main/movies/movie.service';
import { UploadComponent } from './main/upload/upload.component';
import { FileComponent } from './main/upload/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    MoviesComponent,
    MovieComponent,
    UploadComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

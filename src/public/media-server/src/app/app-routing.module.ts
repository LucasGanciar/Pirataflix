import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from '../app/main/movies/movies.component'
import { UploadComponent } from './main/upload/upload.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  { path: 'upload', component: UploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

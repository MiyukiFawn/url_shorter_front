import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApiDocsComponent } from './api-docs/api-docs.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Frost Shorter',
  },
  { path: 'docs', component: ApiDocsComponent, title: 'API Documentation' },
  { path: '**', component: NotFoundComponent },
];

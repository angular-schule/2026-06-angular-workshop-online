import { Routes } from '@angular/router';
// import { booksRoutes } from './books/books.routes';
import { ErrorPage } from './error-page/error-page';

export const routes: Routes = [
    // bei Weiterleitung vom leeren Pfad: fast immer pathMatch:full nötig
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    
    {
        path: 'books',
        loadChildren: () => import('./books/books.routes').then(m => m.booksRoutes)
    },

    // Wildcard-Route: muss immer ganz unten stehen!
    { path: '**', component: ErrorPage }
];

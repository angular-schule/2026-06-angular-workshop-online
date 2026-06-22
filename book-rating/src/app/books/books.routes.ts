import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";
import { BookCreatePage } from "./book-create-page/book-create-page";
import { BookSearchPage } from "./book-search-page/book-search-page";

export const booksRoutes: Routes = [
    { path: '', component: DashboardPage, title: 'Dashboard' },
    { path: 'create', component: BookCreatePage, title: 'Buch erstellen' },
    { path: 'search', component: BookSearchPage, title: 'Buch suchen' },
    { path: ':isbn', component: BookDetailsPage, title: 'Details' },
];
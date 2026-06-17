import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardPage } from "./books/dashboard-page/dashboard-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardPage],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Book Rating!');
}

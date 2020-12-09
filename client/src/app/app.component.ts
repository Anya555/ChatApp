import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';

  ngOnInit(): void {
    window.addEventListener('error', function (event) {
      console.log(event);
    });
  }
}

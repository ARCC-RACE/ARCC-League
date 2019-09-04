import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz44ZiWQmppawIoxjVtCqvnuM44fPUgQnmpZtSASBQVXa8jL20/exec';
    const form1 = document.forms['email1'];
    const form2 = document.forms['email2'];
    const form3 = document.forms['fullForm'];

    form1.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form1)})
        .then(response => null );
        // .catch(error => console.error('Error!', error.message));
    });

    form2.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form2)})
        .then(response => null);
        // .catch(error => console.error('Error!', error.message));
    });

    form3.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form3)})
        .then(response => null);
        // .catch(error => console.error('Error!', error.message));
    });
  }

}

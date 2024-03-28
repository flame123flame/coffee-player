import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { A2hsService } from './a2hs.service';
declare var $: any;
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'banthung';
  token: any;

  constructor(public a2hs: A2hsService,
    private route: ActivatedRoute,
    public router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-78Z3E4BCDQ',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    });
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token != null) {
      localStorage.clear();
      localStorage.setItem('srb-token', this.token);
      window.location.reload();
    }



    // A2HS - START
    a2hs.checkUserAgent();
    a2hs.trackStandalone();
    window.addEventListener('beforeinstallprompt', (e) => {

      // show the add button
      a2hs.promptIntercepted = true;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();
      // Stash the event so it can be displayed when the user wants.
      a2hs.deferredPrompt = e;
      a2hs.promptSaved = true;

    });
    window.addEventListener('appinstalled', (evt) => {
      a2hs.trackInstalled();
      // hide the add button
      // a2hs.promptIntercepted = false;
    });
    // A2HS - END

    // $(document).keydown(function (event) {
    //   if (event.keyCode == 123) {
    //     return false;
    //   }
    //   else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    //     return false;
    //   }
    // });

    // $(document).on("contextmenu", function (e) {
    //   e.preventDefault();
    // });


  }
}



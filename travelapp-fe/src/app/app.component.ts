import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {NavbarComponent} from "./navbar/navbar.component";
declare const AOS: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'travelapp-fe';
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer= inject(DomSanitizer);

  constructor(){
    this.matIconRegistry.addSvgIcon(
      "minus-button-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/minus-button.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "plus-button-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/plus-button.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "location",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/location.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "calendar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/calendar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "family",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/family.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "vacation",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/vacation.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "rocket",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/rocket.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "edit",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/edit.svg")
    );

    this.matIconRegistry.addSvgIcon(
      "trip-style-relaxed",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/coffee.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "trip-style-balanced",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/sun-glasses.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "trip-style-packed",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/rocket.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-culture",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/mask-happy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-adventure",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/mountains.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-relaxation",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/flower-lotus.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-food",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/bowl-steam.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-history",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/scroll.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-nature",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/tree-ever-green.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-shopping",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/shopping-bag.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-nightlife",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/beer-stein.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-family-activities",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/users-three.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-art",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/palette.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-sports",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/soccer-ball.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "interest-wildlife",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/paw-print.svg")
    );
  }

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      once: true, // only animate once per element
    });
  }
}

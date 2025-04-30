import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {HeroComponent} from "./hero/hero.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {Hero2Component} from "./hero2/hero2.component";
import {HowItWorksComponent} from "./how-it-works/how-it-works.component";
import {WhyComponent} from "./why/why.component";
import {CtaComponent} from "./cta/cta.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, HeroComponent, MatIconModule, Hero2Component, HowItWorksComponent, WhyComponent, CtaComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

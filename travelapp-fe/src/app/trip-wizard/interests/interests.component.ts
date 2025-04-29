import {Component, computed, inject, signal} from '@angular/core';
import {TripStyleCardComponent} from "../../ui-components/trip-style-card/trip-style-card.component";
import {InterestCardComponent} from "../../ui-components/interest-card/interest-card.component";
import {tripDetailStore} from '../../stores/trip-wizard.store';
import {MatError} from "@angular/material/form-field";

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [
    TripStyleCardComponent,
    InterestCardComponent,
    MatError
  ],
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css', '../wizard.style.css']
})
export class InterestsComponent {
  protected tripDetailStore = inject(tripDetailStore);

  toggleInterest(interest: string) {
    const interests = this.tripDetailStore.interests();
    const index = interests.indexOf(interest);
    if (index === -1) {
      interests.push(interest);
    } else {
      interests.splice(index, 1);
    }
    this.tripDetailStore.updateInterests(interests);
  }

}

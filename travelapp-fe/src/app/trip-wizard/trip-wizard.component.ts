import {Component, computed, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {StepperItemComponent} from "../ui-components/stepper-item/stepper-item.component";
import {StepperItem} from "../model/stepper-item.model";
import {StepperComponent} from "../ui-components/stepper/stepper.component";
import {wizardStore} from "../stores/wizard.store";
import {DestinationComponent} from "./destination/destination.component";
import {DatesComponent} from "./dates/dates.component";
import {TravelersComponent} from "./travelers/travelers.component";
import {TripStyleComponent} from "./trip-style/trip-style.component";
import {InterestsComponent} from "./interests/interests.component";
import {NotesComponent} from "./notes/notes.component";
import {tripDetailStore} from "../stores/trip-wizard.store";
import {HttpClient} from "@angular/common/http";
import {RecommendedPlace} from "../model/recommended-place.model";

@Component({
  selector: 'app-trip-wizard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    StepperItemComponent,
    StepperComponent,
    DestinationComponent,
    DatesComponent,
    TravelersComponent,
    TripStyleComponent,
    InterestsComponent,
    NotesComponent
  ],
  templateUrl: './trip-wizard.component.html',
  styleUrls: ['./trip-wizard.component.css', './wizard.style.css']
})
export class TripWizardComponent {
  protected store = inject(wizardStore);
  protected stepperItems: StepperItem[] = this.store.steps();
  protected tripDetailStore = inject(tripDetailStore);
  private http = inject(HttpClient);

  protected isPageValid = computed(() => {
    switch (this.store.page()) {
      case 0:
        return this.tripDetailStore.destination();
      case 1:
        return this.tripDetailStore.startDate() && this.tripDetailStore.endDate();
      case 2:
        return (this.tripDetailStore.adults() + this.tripDetailStore.elders()) > 0;
      case 3:
        return this.tripDetailStore.tripStyle();
      case 4:
        return true;
      case 5:
        return true;// case 5:
      default:
        return false;
    }
  })

  onNextClick() {
    this.store.nextPage();
  }

  onPrevClick() {
    this.store.prevPage();
  }

  onFinishClick() {
  const data = {
      destination: this.tripDetailStore.destination(),
      startDate: this.tripDetailStore.startDate(),
      endDate: this.tripDetailStore.endDate(),
      adults: this.tripDetailStore.adults(),
      elders: this.tripDetailStore.elders(),
      children: this.tripDetailStore.children(),
      childAges:this.tripDetailStore.childAges(),
      interests: this.tripDetailStore.interests(),
      tripStyle: this.tripDetailStore.tripStyle(),
      notes: this.tripDetailStore.notes(),
      places: this.tripDetailStore.selectedPlaces()
    };
    this.http.post<RecommendedPlace[]>('https://travelapp-dy97.onrender.com/api/recommendation/plan',data )
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.error(err);
      });
  }
}

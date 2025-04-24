import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tripDetailStore} from "../../stores/trip-wizard.store";
import {RecommendedPlace} from "../../model/recommended-place.model";

@Component({
  selector: 'app-trip-step-generate-plan',
  standalone: true,
  imports: [],
  templateUrl: './trip-step-generate-plan.component.html',
  styleUrl: './trip-step-generate-plan.component.css'
})
export class TripStepGeneratePlanComponent {
  private http = inject(HttpClient);
  protected tripStore = inject(tripDetailStore);
  private data = {
    destination: this.tripStore.destination(),
    startDate: this.tripStore.startDate(),
    endDate: this.tripStore.endDate(),
    adults: this.tripStore.adults(),
    elders: this.tripStore.elders(),
    children: this.tripStore.children(),
    childAges:this.tripStore.childAges(),
    interests: this.tripStore.interests(),
    tripStyle: this.tripStore.tripStyle(),
    notes: this.tripStore.notes(),
    places: this.tripStore.selectedPlaces()
  };
  ngAfterViewInit() {
    console.log(this.data);
    this.callAi();
  }

  callAi(){
    this.http.post<RecommendedPlace[]>('http://localhost:5282/api/recommendation/plan',this.data )
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.error(err);
      });
  }
}

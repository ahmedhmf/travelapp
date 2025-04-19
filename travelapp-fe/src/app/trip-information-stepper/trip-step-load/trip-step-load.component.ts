import {AfterViewInit, Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tripDetailStore} from "../../stores/trip-wizard.store";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-trip-step-load',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './trip-step-load.component.html',
  styleUrl: './trip-step-load.component.css'
})
export class TripStepLoadComponent implements AfterViewInit{
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
   notes: this.tripStore.notes()
 };
  ngAfterViewInit() {
    console.log(this.data);
    this.http.post<any>('http://localhost:5282/api/itinerary',this.data )
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.error(err);
      });
  }
}

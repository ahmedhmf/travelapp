import {AfterViewInit, Component, EventEmitter, inject, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tripDetailStore} from "../../stores/trip-wizard.store";
import {JsonPipe} from "@angular/common";
import {RecommendedPlace} from "../../model/recommended-place.model";

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
  @Output() next = new EventEmitter<void>();

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
    this.callAi();
  }

  callAi(){
    this.http.post<RecommendedPlace[]>('http://localhost:5282/api/recommendation',this.data )
      .subscribe(res => {
        this.tripStore.updateRecommendedPlace(res);
        console.log(res);
        this.next.emit();
      }, err => {
        console.error(err);
      });
  }
}

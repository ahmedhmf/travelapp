import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Itinerary} from "../../../itinerary.model";

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatDatepickerToggle,
    MatDatepickerInput,
    ReactiveFormsModule,
    MatDatepicker,
    MatSelect,
    MatOption,
    MatLabel,
    FormsModule
  ],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.css'
})
export class TripFormComponent {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  tripForm: FormGroup;
  interests: string[] = ['History', 'Nature', 'Food', 'Shopping', 'Relaxation', 'Kid-friendly', 'Sightseeing'];
  itinerary: string = '';
  loading: boolean = false;
  itineraryData: Itinerary | null = null;

  constructor() {
    this.tripForm = this.fb.group({
      destination: [''],
      startDate: [''],
      endDate: [''],
      adults: [2],
      elders: [0],
      children: [0],
      childAges: [''],
      interests: [[]],
      tripStyle: ['Balanced'],
      notes: ['']
    });
  }

  submitForm() {
    this.loading = true;
    this.http.post<any>('http://localhost:5282/api/itinerary', {
      destination: 'Budapest',
      startDate: '2025-04-19',
      endDate: '2025-04-23',
      adults: 2,
      elders: 2,
      children: 1,
      childAges: ['3 years'],
      interests: ['Food', 'Kid-friendly', 'History'],
      tripStyle: 'Balanced',
      notes: 'Elders can’t walk far. All meals should be shared.'
    })
      .subscribe(res => {
        this.itineraryData = res || null;
        this.loading = false;
      }, err => {
        console.error('Proxy error:', err);
        this.itinerary = 'There was a problem generating your itinerary.';
        this.loading = false;
      });
  }
}

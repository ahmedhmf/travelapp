import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TripWizardService {
  city = new FormControl('', [Validators.required]);
};

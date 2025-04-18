import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripInformationStepperService {

  public getHtmlInputElement(event: Event) {
    return event.target as HTMLInputElement;
  }
}

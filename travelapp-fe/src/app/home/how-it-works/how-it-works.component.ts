import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  steps = [
    {
      title: 'Share the Magic Ingredients',
      description: `Tell us where you’re going, when, and who’s joining — like giving your travel genie the perfect wish list.`,
      image: './images/how-it-works1.svg'
    },
    {
      title: 'Let the AI Wizards Work',
      description: `In just seconds, Wanderly conjures a personalized, smart itinerary — tailored to your pace, preferences, and even the weather.`,
      image: './images/how-it-works2.svg'
    },
    {
      title: 'Make It Yours',
      description: `Tweak your plan like a pro: swap places, adjust times, or add your own secret spots — it’s all up to you.`,
      image: './images/how-it-works3.svg'
    },
    {
      title: 'Take Off with Style',
      description: `Print your plan as a beautiful PDF, share it with fellow adventurers, or carry it in your pocket with our mobile app.`,
      image: './images/how-it-works4.svg'
    }
  ];
}

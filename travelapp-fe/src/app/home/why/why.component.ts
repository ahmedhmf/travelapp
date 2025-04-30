import {Component} from '@angular/core';

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [],
  templateUrl: './why.component.html',
  styleUrl: './why.component.scss'
})
export class WhyComponent {
  features = [
    {
      title: 'AI-Powered Magic',
      description: 'Instantly get a smart, personalized itinerary that fits your style, travel pace, and group.',
      image: './images/why-1.svg'
    },
    {
      title: 'Realistic, Time-Savvy Schedules',
      description: 'We consider traffic, travel time, and weather to keep your trip smooth and stress-free.',
      image: './images/why-2.svg'
    },
    {
      title: 'Food Picks for Every Budget',
      description: 'Whether you want street food or fine dining, we recommend the best eats for your budget.',
      image: './images/why-3.svg'
    },
    {
      title: 'Export, Share, and Go',
      description: 'Download your plan as a beautiful PDF, share it with friends, or sync to the mobile app.',
      image: './images/why-4.svg'
    }
  ];
}

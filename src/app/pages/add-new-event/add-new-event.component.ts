import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-event',
  templateUrl: './add-new-event.component.html',
  styleUrls: ['./add-new-event.component.css']
})
export class AddNewEventComponent {
  step: any = 1;

  next(){
    this.step = this.step + 1;
  }

  previus(){
    this.step = this.step - 1;
  }
}

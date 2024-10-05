import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent {

  verification(){
    Swal.fire({
      text: "Este codigo de evento es valido",
      icon: "success"
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCloudinary } from 'src/app/model/image-cloudinary.model';

@Component({
  selector: 'app-show-payment-images-dialog',
  templateUrl: './show-payment-images-dialog.component.html',
  styleUrls: ['./show-payment-images-dialog.component.css']
})
export class ShowPaymentImagesDialogComponent implements OnInit{
  image: ImageCloudinary;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.image = this.data.image; // Asigna la imagen recibida
    this.receiveImage();
  }

  receiveImage(){
    console.log("data: " + this.image);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowPaymentImagesDialogComponent } from 'src/app/components/show-payment-images-dialog/show-payment-images-dialog.component';
import { BoostRequest } from 'src/app/model/boost-request.model';
import { BoostService } from 'src/app/services/boost.service';

@Component({
  selector: 'app-boost-requests',
  templateUrl: './boost-requests.component.html',
  styleUrls: ['./boost-requests.component.css']
})
export class BoostRequestsComponent implements OnInit{
  boostRequest: BoostRequest[] = [];

  constructor(private boostService: BoostService, public imagesDialog: MatDialog){};

  ngOnInit(): void {
    this.getBoostRequests();
  }

  getBoostRequests(){
    this.boostService.getBoostRequests().subscribe(
      (response: BoostRequest[]) => {
        this.boostRequest = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  showImages(boostRequest: BoostRequest){
    console.log(boostRequest);

    this.imagesDialog.open(ShowPaymentImagesDialogComponent, {
      data: {
        images: boostRequest.image
      },
      height: '500px', 
      width: '800px'
    });
  }
}

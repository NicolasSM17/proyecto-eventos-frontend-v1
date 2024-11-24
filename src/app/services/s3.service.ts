import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    // Configuración de AWS
    AWS.config.update({
      accessKeyId: environment.aws.accessKeyId,
      secretAccessKey: environment.aws.secretAccessKey,
      region: environment.aws.region
    });

    this.s3 = new AWS.S3();
    this.bucketName = environment.aws.bucketName;
  }

  
  // Método para obtener la URL del PDF
  getPDFUrl(fileName: string = 'Catálogo U-manyas.pdf'): string {
    // Codificar el nombre del archivo para la URL
    const encodedFileName = encodeURIComponent(fileName);
    return `https://${this.bucketName}.s3.amazonaws.com/${encodedFileName}`;
  }

  // Método para verificar si el archivo existe
  checkIfFileExists(fileName: string = 'Catálogo U-manyas.pdf'): Observable<boolean> {
    const params = {
      Bucket: this.bucketName,
      Key: fileName
    };

    return from(
      this.s3.headObject(params)
        .promise()
        .then(() => true)
        .catch(() => false)
    );
  }
}

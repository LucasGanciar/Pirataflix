import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from  '@angular/common/http';  
import { Injectable } from '@angular/core';
import { map } from  'rxjs/operators';

@Injectable({  
    providedIn: 'root'  
  })  
export class UploadService {
    private SERVER_URL: string = 'http://localhost:8000/upload'
    constructor(private httpClient: HttpClient) { }
    public upload(formData) {
        return this.httpClient.post<any>(this.SERVER_URL, formData, {  
          reportProgress: true,  
          observe: 'events' ,
          headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type'}
        });  
    }
}
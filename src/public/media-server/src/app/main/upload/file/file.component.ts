import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UploadService } from '../upload.service';
import { catchError, map } from 'rxjs/operators';  
import { of } from 'rxjs';  

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input() title: string
  response: any
  file: any
  fileSelected: boolean = false
  progress: Number = 0

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
  }

  onChange(files: FileList){
    this.fileSelected = files.length > 0
    this.file = files.item(0)
  }

  onClick() {
    this.uploadFile(this.file);  
  }

  uploadFile(file) {  
    const formData = new FormData();  
    formData.append('file', file);  
    file.inProgress = true;  
    this.uploadService.upload(formData).pipe(  
      map(event => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            this.progress = file.progress
            break;  
          case HttpEventType.Response:  
            this.response = event.body
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })
    ).subscribe((event: any) => {  
      if (typeof (event) === 'object') {  
        console.log(event.body);  
      }  
    });  
  }
}

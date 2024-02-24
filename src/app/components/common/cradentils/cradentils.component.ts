import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-cradentils',
  templateUrl: './cradentils.component.html',
  styleUrls: ['./cradentils.component.css']
})
export class CradentilsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Received data:', this.data);
  }
  

  ngOnInit() {
  }

  downloadPdf() {
    const pdf = new jsPDF();
    const content: HTMLElement = document.getElementById('pdfContent');

    pdf.html(content, {
      callback: () => {
        pdf.save('credentials.pdf');
      },
      html2canvas: {
        scale: 0.5, 
      },
    });
  }
}

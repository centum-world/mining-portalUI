// mining-signup.component.ts

import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

@Component({
  selector: 'app-mining-signup',
  templateUrl: './mining-signup.component.html',
  styleUrls: ['./mining-signup.component.css']
})
export class MiningSignupComponent implements OnInit, AfterViewInit {
  @ViewChild('phoneNumberInput', { static: true }) phoneNumberInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const inputElement = this.phoneNumberInput.nativeElement;
    const iti = intlTelInput(inputElement, {
      separateDialCode: true,
      nationalMode: false,
    });
    console.log('IntlTelInput instance:', iti);
    iti.setCountry('IN');
    setTimeout(() => {
      const selectedCountryData = iti.getSelectedCountryData();
      console.log('Selected Country Code:', selectedCountryData.dialCode);
    }, 500); 
  }
}

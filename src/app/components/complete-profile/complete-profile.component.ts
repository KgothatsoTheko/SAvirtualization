import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
  providers: [DatePipe]
})
export class CompleteProfileComponent {

  startDate = new FormControl('', Validators.required)
  endDate = new FormControl('',Validators.required)
  checked = false
  codes:string[] = ['A', 'A1', 'B', 'C1', 'C', 'EB', 'EC1', 'EC']
  numbers:string[] = ['0','1', '2', '3', '4', '5', '6']


  constructor(private shared: SharedService, private datePipe: DatePipe) {

  }

  profileForm = new FormGroup({
    licenseNumber: new FormControl('', Validators.required),
    valid: new FormControl('', Validators.required),
    issued: new FormControl('ZA', Validators.required),
    code: new FormControl('', Validators.required),
    vehicleRestriction: new FormControl('', Validators.required),
    firstIssued: new FormControl('', Validators.required),
  })

  check() {
    this.checked = !this.checked;
  }

  goBack() {
    this.shared.goBack()
  }

  complete() {

    const startDate1 = this.startDate.value
    const endDate1 = this.endDate.value
    const firstIssued1 = this.profileForm.controls['firstIssued'].value
    if (startDate1 && endDate1 && firstIssued1) {
      const formattedStartDate = this.datePipe.transform(this.startDate.value, 'dd/MM/yyyy');
      const formattedEndDate = this.datePipe.transform(this.endDate.value, 'dd/MM/yyyy');
      const formattedfirstIssued = this.datePipe.transform(this.profileForm.controls['firstIssued'].value, 'dd/MM/yyyy');
      this.profileForm.get('valid')?.setValue(`${formattedStartDate} - ${formattedEndDate}`);
      this.profileForm.get('firstIssued')?.setValue(`${formattedfirstIssued}`);
    }

    console.log("complete profile", this.profileForm.value);
    
  }
}

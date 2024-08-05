import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
  providers: [DatePipe]
})
export class CompleteProfileComponent{

  startDate = new FormControl('', Validators.required)
  endDate = new FormControl('',Validators.required)
  checked = false
  codes:string[] = ['A', 'A1', 'B', 'C1', 'C', 'EB', 'EC1', 'EC']
  numbers:string[] = ['0','1', '2', '3', '4', '5', '6']
  PrDP:string[] = ['Goods', 'Passengers', 'Dangerous']
  showSignature = false
  showingMenu = true
  element: string = "No Signature"
  fileName:any | string="No Portrait"
  upload:any
  fileChoosen:any
  uploadFileClicked = false;
  hideSignatureClicked = false;


  constructor(private shared: SharedService, private datePipe: DatePipe, private api: ApiService, private cd: ChangeDetectorRef) {

    let user = this.shared.get('user', 'session')
    console.log('current user:', user)

    let file = this.shared.get('portrait', 'session')
    console.log('portratit:', file)

    let sign = this.shared.get('signature', 'session')
    console.log('signature:', sign)

    
  }

  uploadFile() {
    if(this.uploadFileClicked) return
  this.uploadFileClicked = true;

    this.upload = document.getElementById('upload') as HTMLInputElement;
    this.fileChoosen = document.getElementById('file-choosen');

    if (this.upload && this.fileChoosen) {
      this.upload.addEventListener('change', (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          console.log(input.files[0]);
          const card1 = document.getElementById('card1')
          card1!.style.backgroundColor = 'green' 
          card1!.removeChild(input)
          this.fileChoosen.textContent = input.files[0].name;
          this.fileName = input.files[0].name
          this.shared.set('portrait', JSON.stringify({ name: input.files[0].name, size: input.files[0].size, type: input.files[0].type }), 'session')
        }
      });
    } else {
      console.log("something went wrong...");
      
    }
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
    const see = this.shared.get('portrait', 'session')
    console.log(see);
    
  }

  hideSignature() {
    if(this.hideSignatureClicked) {return }else {
      const card3 = document.getElementById('card3')
    console.log(card3);
    card3!.style.backgroundColor = 'green' 
    card3!.removeAttribute('changeHover')
    }
    this.hideSignatureClicked = true
    this.showSignature = true
    this.showingMenu = false
    this.element = "Signature Taken ✅"
  }

  handleEvent(event:any) {
    console.log(event)
    this.showSignature = false
    this.showingMenu = event
  }

  handleEvent2(event:any) {
    if (event) {
      console.log(event);
      this.shared.set('signature',JSON.stringify(event), 'session')
    } else {
      console.log("something went wrong...");
    }
  }
}


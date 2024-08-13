import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent{

  currentUser:any
  profile:string | undefined

  panelOpenState = false;
  date:any = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear()
  value:any = new Date().getTime()
  width:any = 0.4
  height:any = 20
  value2:any = 1207175222083
  width2:any = 1.32
  height2:any = 40

  constructor(private shared: SharedService, private api: ApiService, private snackbar: MatSnackBar, private router: Router) {
    const user = this.shared.get('currentUser', 'session')
    this.currentUser = user.data
    console.log(this.currentUser);

    this.api.genericGet(`/get-file/${this.currentUser.file.id}`).subscribe(
      (response:Blob) => {
          this.createImageFromBlob(response);
      },
      (error:any) => {
        this.snackbar.open(`Session Expired`, 'Ok', { duration: 2000 });
        sessionStorage.clear()
        this.router.navigate(['/login'])
      }
    )
    
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profile = reader.result as string;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  
}

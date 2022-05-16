import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {
  title = "Imagen de Perfil"
  public imageNewSrc: string='';
  private profileImage?:File

  constructor(
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: User, type: Number },
    private authService: AuthService,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<ProfileImageComponent>,


    
  ) { }

  ngOnInit(): void {

  }
  private onReturn = (category: User): void => this.dialogRef.close(category);

  addUpd(){}

  readURL(event: any): void {
    if ( event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        this.profileImage=file;
        const reader = new FileReader();
        reader.onload = e => this.imageNewSrc = reader.result as string || '';
        reader.readAsDataURL(file);
    }
  }

  onUploadProfileImage(){
    if(!this.profileImage)
      return

    this.authService.uploadProfileImage(this.profileImage).subscribe({
      next: (d)=>{
        this.showMessage.success({message: d.msg})
        this.onReturn(this.paramsDialog.row)

      }, 
      error:(e)=>{
       this.showMessage.error({message: e.error.message}) 
      }
    })

    
  }
}
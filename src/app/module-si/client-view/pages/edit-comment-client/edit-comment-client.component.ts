import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comment-client',
  templateUrl: './edit-comment-client.component.html',
  styleUrls: ['./edit-comment-client.component.scss']
})
export class EditCommentClientComponent implements OnInit {


  title = "Editar Comentario";
  bussComment?:string
  constructor(
    private dialogRef: MatDialogRef<EditCommentClientComponent>,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: BusinessComment , type: number },

  ) { }


  ngOnInit(): void {
    this.setData()
  }
  setData(){
    this.bussComment=this.paramsDialog.row.bussComment
    
  }

  
  onReturn = (bs: BusinessComment): void => this.dialogRef.close(bs);

  ok() {
    const bc: BusinessComment={bussComment: this.bussComment};
    //const t=this.selectRadio;
    //console.log(t);
      this.onReturn(bc);
 
  }


}

  export interface BusinessComment{
  bussComment?:string,
  
  }


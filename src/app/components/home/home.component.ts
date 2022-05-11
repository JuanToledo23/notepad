import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from 'src/app/services/notes.service';
// import { Notes } from '../../interfaces/note.interface'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: string | null = localStorage.getItem('user');
  notes: Array<any> = []

  constructor(public dialog: MatDialog, public notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotes(this.user).subscribe(response => {
      this.notes = [];
      response.forEach((element: any) => {
        this.notes.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddNote, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notesService.addNote(this.user, {
        date: new Date(),
        description: result.description,
        title: result.title,
        archive: false
      })
    });
  }

  updateArchive(id: string, archive: boolean) {
    this.notesService.updateArchive(this.user, id, archive)
  }

  deleteNote(id: string) {
    const dialogRef = this.dialog.open(DialogDeleteNote);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.notesService.deleteNote(this.user, id)
      }
    });
  }

}

@Component({
  selector: 'add-note',
  templateUrl: 'add-note.html',
  styleUrls: ['./home.component.css']
})
export class DialogAddNote {

  constructor(
    public dialogRef: MatDialogRef<DialogAddNote>
  ) {}

  title: string = '';
  description: string = '';
  validations: Array<boolean> = [false, false, false]

  close() {
    if(this.validateEmail(this.title)) {
      this.validations[0] = true;
    } else if(this.description.length < 25 || this.description.length > 150) {
      this.validations[1] = true;
    } else {
      this.dialogRef.close({title: this.title, description: this.description});
    }
  }

  validateEmail(mail : string) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return (true)
    return (false)
  }

  alpha(e: any) {
    let k;
    document ? k = e.keyCode : k = e.which;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k > 237 && k < 255) || k == 32 || (k >= 48 && k <= 57));
  }
}


@Component({
  selector: 'delete-note',
  templateUrl: 'delete-note.html',
})
export class DialogDeleteNote {}
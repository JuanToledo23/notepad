import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from "rxjs";
import { Notes } from '../interfaces/note.interface'

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    constructor(private firestore: AngularFirestore) { }

    addNote(collection: any, note: Notes): Promise<any>  {
        return this.firestore.collection(collection).add(note);
    }

    getNotes(collection: any): Observable<any> {
        return this.firestore.collection(collection).snapshotChanges();
    }

    updateArchive(collection: any, document: any, status: boolean) {
        this.firestore.collection(collection).doc(document).update({archive: !status});
    }
    
    deleteNote(collection: any, document: any) {
        this.firestore.collection(collection).doc(document).delete();
    }
}
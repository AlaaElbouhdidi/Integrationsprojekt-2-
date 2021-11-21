import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Activity } from '@api-interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  activityCollection: AngularFirestoreCollection<Activity>;
  activities: Observable<Activity[]>;

  constructor(public afs: AngularFirestore) { 
    this.activityCollection = this.afs.collection('activity', ref =>  ref.orderBy('name', 'asc'));
    this.activities = this.activityCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Activity;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllActivities(){
    return this.activities;
  }
}

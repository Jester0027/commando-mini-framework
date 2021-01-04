import {singleton} from "tsyringe";
import {FirebaseService} from "./firebase.service";
import {firestore} from "firebase-admin/lib/firestore";
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

@singleton()
export class FirestoreService {
    public constructor(private fireService: FirebaseService) {
    }

    public forEach<T>(collection: string, callback: Function): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const col = await this.fireService.getCollection(collection)
            col.get()
                .then(res => {
                    res.forEach((doc: QueryDocumentSnapshot<T>) => {
                        callback(doc.data());
                    });
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

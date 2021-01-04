import {singleton} from "tsyringe";
import {initializeApp, credential} from "firebase-admin";
import {botConfiguration} from "../../config/bot-configuration";
import {app} from "firebase-admin/lib/firebase-namespace-api";
import App = app.App;
import {firestore} from "firebase-admin/lib/firestore";
import CollectionReference = firestore.CollectionReference;
import DocumentReference = firestore.DocumentReference;
import {database} from "firebase-admin/lib/database";
import Database = database.Database;

@singleton()
export class FirebaseService {

    private app: App = null;

    public init(): void {
        if (!this.app) {
            this.app = initializeApp({
                credential: credential.cert({
                    clientEmail: botConfiguration.firebaseServiceAccount.client_email,
                    privateKey: botConfiguration.firebaseServiceAccount.private_key,
                    projectId: botConfiguration.firebaseServiceAccount.project_id
                }),
                databaseURL: botConfiguration.firebaseServiceAccount.database_URL
            });
        }
    }

    public getApp(): Promise<App> {
        return this.returnPromise<App>(this.app);
    }

    public getCollection(path: string): Promise<CollectionReference> {
        return this.returnPromise<CollectionReference>(this.app.firestore().collection(path));
    }

    public getDocument(collection: string, document: string): Promise<DocumentReference> {
        return this.returnPromise<DocumentReference>(this.app.firestore().collection(collection).doc(document));
    }

    public getDatabase(): Promise<Database> {
        return this.returnPromise<Database>(this.app.database());
    }

    private returnPromise<T>(obj: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            try {
                resolve(obj);
            } catch (err) {
                reject(err);
            }
        })
    }
}


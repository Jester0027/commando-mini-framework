import './bootstrap';
import {container} from "tsyringe";
import {Bot} from "./bot";
import {FirebaseService} from "./services/firebase/firebase.service";

if(process.env.FIREBASE_PROJECT_ID){
    container.resolve(FirebaseService).init();
}

container.resolve(Bot).main();

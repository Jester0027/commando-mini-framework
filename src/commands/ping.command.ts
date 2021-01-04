import {Command, CommandMessage} from "discord.js-commando";
import {container} from "tsyringe";
import {ClientService} from "../services/discord/client.service";
import {FirebaseService} from "../services/firebase/firebase.service";

export class PingCommand extends Command {
    constructor(client: ClientService) {
        super(client, {
            name: 'truc',
            group: 'commands',
            memberName: 'ping',
            description: 'ping command',
        });
    }

    async run(message: CommandMessage) {
        const firebase = container.resolve(FirebaseService);
        const app = await firebase.getApp();
        // @ts-ignore
        return message.say(`Firebase project: ${app.options.credential.projectId}`);
    }
}

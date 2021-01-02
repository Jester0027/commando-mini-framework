import {Command, CommandMessage} from "discord.js-commando";
import {inject} from "tsyringe";
import {ClientService} from "../services/discord/client.service";

export class PingCommand extends Command {
    constructor(@inject(ClientService) client: ClientService) {
        super(client, {
            name: 'pings',
            group: 'commands',
            memberName: 'ping',
            description: 'ping command',
        });
    }

    run(message: CommandMessage) {
        return message.say("pong");
    }
}

import {singleton} from "tsyringe";
import {CommandoClient} from 'discord.js-commando';
import {botConfiguration} from "../../config/bot-configuration";

/**
 * Discord bot client singleton service.
 * Inject this service to access the bot client.
 */
@singleton()
export class ClientService extends CommandoClient {
    public constructor() {
        super(botConfiguration.client);
    }
}

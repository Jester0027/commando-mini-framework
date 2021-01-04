import {injectable} from "tsyringe";
import {ClientService} from "./services/discord/client.service";
import {PingCommand} from "./commands/ping.command";

@injectable()
export class Bot {
    public constructor(private client: ClientService) {
    }

    public main(): void {
        this.client.registry
            .registerDefaults()
            .registerCommands([
                PingCommand
            ])
        ;

        this.client.login(process.env.BOT_TOKEN).then(() => {
            console.log('\t', "\x1b[30m", "\x1b[42m", 'The bot is working', "\x1b[0m");
        });
    }
}

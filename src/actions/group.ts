import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { EosConsole } from 'eos-console';

const ipAddress = "localhost";
const port = 3032;
const eos = new EosConsole({ host: ipAddress, port });

@action({ UUID: "com.max-mcdaniel.etc-eos.group" })
export class Group extends SingletonAction {
    override async onWillAppear(ev: WillAppearEvent<GroupSettings>): Promise<void> {
        const settings = ev.payload.settings;
        await eos.connect();
        return ev.action.setTitle("Group");
    }

    override async onKeyDown(ev: KeyDownEvent<GroupSettings>): Promise<void> {
        const settings = ev.payload.settings;
        const targetNum = parseInt(settings.group);
        
        await eos.executeCommand(`Group ${targetNum}`, [], false);
    }
};

type GroupSettings = {
    group: string
};
import { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { EosConsole } from 'eos-console';

const ipAddress = "localhost";
const port = 3032;
const eos = new EosConsole({ host: ipAddress, port });

@action({ UUID: "com.max-mcdaniel.etc-eos.patch" })
export class Patch extends SingletonAction {
    override async onWillAppear(ev: WillAppearEvent): Promise<void> {
        await eos.connect();
        return ev.action.setTitle("Open Patch");
    }

    override async onKeyDown(ev: KeyDownEvent): Promise<void> {
        await eos.sendMessage(`/eos/key/open_dmx_patch`);
    }
};
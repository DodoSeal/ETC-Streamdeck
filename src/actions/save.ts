import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { EosConsole } from 'eos-console';

const ipAddress = "localhost";
const port = 3032;
const eos = new EosConsole({ host: ipAddress, port });

@action({ UUID: "com.max-mcdaniel.etc-eos.save" })
export class Save extends SingletonAction {
    override async onWillAppear(ev: WillAppearEvent): Promise<void> {
        await eos.connect().catch((e) => {
            streamDeck.logger.trace("There was an error connecting to your Eos Console.")
        });
        return ev.action.setTitle("Save Show");
    }

    override async onKeyDown(ev: KeyDownEvent): Promise<void> {
        await eos.sendMessage(`/eos/key/save_show`).then(() => {
            ev.action.showOk();
        });
    }
};
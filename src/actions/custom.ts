import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { EosConsole } from 'eos-console';

const ipAddress = "localhost";
const port = 3032;
let connected: boolean;
const eos = new EosConsole({ host: ipAddress, port });

@action({ UUID: "com.max-mcdaniel.etc-eos.custom" })
export class Custom extends SingletonAction {
    override async onWillAppear(ev: WillAppearEvent<CustomSettings>): Promise<void> {
        await eos.connect().then(() => {
            connected = true;
        }).catch((e) => {
            streamDeck.logger.trace("There was an error connecting to your Eos Console.")
            connected = false;
        });
        return ev.action.setTitle("Custom");
    }

    override async onKeyDown(ev: KeyDownEvent<CustomSettings>): Promise<void> {
        const settings = ev.payload.settings;
        const customOsc = settings.target;
        let args = customOsc.split(`=`);

        if (!args[0].includes(`/eos/`)) {
            return ev.action.showAlert();
        };

        if (connected == false) {
            return ev.action.showAlert();
        };

        await eos.sendMessage(args[0], args.slice(1)).then(() => {
            ev.action.showOk();
        });
    }
};

type CustomSettings = {
    target: string
};
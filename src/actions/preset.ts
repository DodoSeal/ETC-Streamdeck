import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { EosConsole } from 'eos-console';

const ipAddress = "localhost";
const port = 3032;
let connected: boolean;
const eos = new EosConsole({ host: ipAddress, port });

@action({ UUID: "com.max-mcdaniel.etc-eos.preset" })
export class Preset extends SingletonAction {
    override async onWillAppear(ev: WillAppearEvent<PresetSettings>): Promise<void> {
        await eos.connect().then(() => {
            connected = true;
        }).catch((e) => {
            streamDeck.logger.trace("There was an error connecting to your Eos Console.")
            connected = false;
        });
        return ev.action.setTitle("Preset");
    }

    override async onKeyDown(ev: KeyDownEvent<PresetSettings>): Promise<void> {
        const settings = ev.payload.settings;
        const targetNum = parseInt(settings.target);

        if (connected == false) {
            return ev.action.showAlert();
        };

        await eos.executeCommand(`Preset ${targetNum}`, [], false).then(() => {
            ev.action.showOk();
        });
    }
};

type PresetSettings = {
    target: string
};
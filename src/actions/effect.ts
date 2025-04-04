import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { EosConsole } from 'eos-console';

const ipAddress = "localhost";
const port = 3032;
const eos = new EosConsole({ host: ipAddress, port });

@action({ UUID: "com.max-mcdaniel.etc-eos.effect" })
export class Effect extends SingletonAction {
    override async onWillAppear(ev: WillAppearEvent<EffectSettings>): Promise<void> {
        await eos.connect().catch((e) => {
            streamDeck.logger.trace("There was an error connecting to your Eos Console.")
        });
        return ev.action.setTitle("Effect");
    }

    override async onKeyDown(ev: KeyDownEvent<EffectSettings>): Promise<void> {
        const settings = ev.payload.settings;
        const targetNum = parseInt(settings.target);

        await eos.executeCommand(`Effect ${targetNum}`, [], false).then(() => {
            ev.action.showOk();
        });
    }
};

type EffectSettings = {
    target: string
};
import streamDeck, { action, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";
import { EosConsole } from 'eos-console';

const ipAddress = "localhost";
const port = 3032;
const eos = new EosConsole({ host: ipAddress, port });

@action({ UUID: "com.max-mcdaniel.etc-eos.send-macro" })
export class SendMacro extends SingletonAction<MacroSettings> {
    override async onWillAppear(ev: WillAppearEvent<MacroSettings>): Promise<void> {
        const settings = ev.payload.settings;
        await eos.connect().catch((e) => {
            streamDeck.logger.trace("There was an error connecting to your Eos Console.")
        });
        return ev.action.setTitle("Macro");
    }

    override async onKeyDown(ev: KeyDownEvent<MacroSettings>): Promise<void> {
        const settings = ev.payload.settings;
        const macroNum = parseInt(settings.macro);
        
        await eos.sendMessage(`/eos/macro/${macroNum}/fire`).then(() => {
            ev.action.showOk();
        });
    }
};

type MacroSettings = {
    macro: string
};
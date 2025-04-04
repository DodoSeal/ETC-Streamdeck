import streamDeck, { LogLevel } from "@elgato/streamdeck";
import { SendMacro } from "./actions/sendMacro";
import { Group } from "./actions/group";
import { Patch } from "./actions/patch";
import { Effect } from "./actions/effect";
import { Save } from "./actions/save";
import { Preset } from "./actions/preset";
import { Custom } from "./actions/custom";

streamDeck.logger.setLevel(LogLevel.TRACE);

streamDeck.actions.registerAction(new SendMacro());
streamDeck.actions.registerAction(new Group());
streamDeck.actions.registerAction(new Effect());
streamDeck.actions.registerAction(new Preset());
streamDeck.actions.registerAction(new Patch());
streamDeck.actions.registerAction(new Save());
streamDeck.actions.registerAction(new Custom());

streamDeck.connect();
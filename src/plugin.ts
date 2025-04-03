import streamDeck, { LogLevel } from "@elgato/streamdeck";
import { SendMacro } from "./actions/sendMacro";
import { Group } from "./actions/group";
import { Patch } from "./actions/patch";
import { Effect } from "./actions/effect";
import { Save } from "./actions/save";

streamDeck.logger.setLevel(LogLevel.TRACE);

streamDeck.actions.registerAction(new SendMacro());
streamDeck.actions.registerAction(new Group());
streamDeck.actions.registerAction(new Patch());
streamDeck.actions.registerAction(new Effect());
streamDeck.actions.registerAction(new Save());

streamDeck.connect();
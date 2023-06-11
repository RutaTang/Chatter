import { ActionRequest, ActionResponse, Manifest } from "../general";

export interface Actor {
    callAction: (parameters: ActionRequest['parameters'], manifest?: Manifest) => Promise<ActionResponse['response']>;
}

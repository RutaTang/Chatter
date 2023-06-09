import { ActionsResponse } from "types"
import { ActorMetaData } from "../types"

export const INFORM_ACTORS_LIST_FORMAT_PROMPT_MESSAGE = `
The actor plugins are available for you to use in order to interact with the real world. Each actor plugin has a set of actions that you can request it to perform. The actor plugins structure and format is as follow JSON code:

\`\`\`json
// The JSON array represents an array of actor plugins
[
   // The JSON object represents one actor plugin
   {
      // actor plugin's name
      "name": "...", 
       // The JSON array represents an array of actions available for the actor plugin
      "actions":[
         // The JSON object represents one action
         {
            // action's name
            "name": "...", 
            // action's description
            "description": "...", 
            // The JSON array represents an array of parameters of the action 
            "parameters": [
                 {
                     // parameter's name
                     "name":"...",
                    // parameters' description
                     "description":"..."
                 }
             ]
         }
      ]
   }
]
\`\`\`
`
export const INFORM_ACTORS_RESPONSE_FORMAT_PROMPT_MESSAGE = `
Your response must follow these rules:

* You must select the appropriate actions from the actor plugins you want to use. 
* If no appropriate actions are available, respond with an empty array.
* You must provide the appropriate and correct parameters for their respective actions. 
* Your response must be in JSON format as follows, with no additional explanation.

\`\`\`json
[
   {
      "actor_name":"", // actor plugin's name
      "action_name":"", // action's name
      "parameters":{
            "parameter name": "parameter's value"
      }
   },
]
\`\`\`

**Note: multiple actions will not be run in order but instead they will be run in parallel**
`

export const INFORM_ACTORS_LIST_PROMPT_MESSAGE = (actors: ActorMetaData[]) => `
Here are all available actor plugins:

\`\`\`json
${JSON.stringify(actors, null, 2)}
\`\`\`
`

export const FOLLOW_EACH_USER_MESSAGE_PROMPT_MESSAGE = `(Choose and use available actor plugins provided above if any of them are appropriate and appliable, and then respond in JSON/json which should be wrapped within a markdown code block, with no explanation)
`

export const FOLLOW_EACH_USER_MESSAGE_NOT_CHOOSE_ACTOR_PLUGIN_PROMPT_MESSAGE = `(You should not choose any plugins and you must give your response based on your own understanding and knowledge! You are not neccessary to give response in JSON format and you can respond in natural language. Do not choose any actor plugins!)`

export const INFORM_ACTIOS_RESPONSE_PROMPT_MESSAGE = (actionsResponse: ActionsResponse) => {
    const actionsResponseString = JSON.stringify(actionsResponse, null, 2)
    return ` The response/consequence of the actions are:

\`\`\`json
${actionsResponseString}
\`\`\`

    You should respond with this information in mind while combing with your knowledge. You can trust the information provided. You should not choose any plugins for this response and you are not necessary to give response in JSON fomat and you can respond in natural language.`
}


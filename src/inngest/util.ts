import {Sandbox} from "@e2b/code-interpreter";
import { TextMessage } from "@inngest/agent-kit";

export const getSandbox = async (sandboxId: string) => {
    const sandbox = await Sandbox.connect (sandboxId)
    return sandbox;
};

export function lastAssistantTextMessageContent(result: any) {
    const lastAssistantTextMessageIndex = result.output.findLastIndex(
        (message: any) => message.role === "assistant",
    );
    const message = result.output[lastAssistantTextMessageIndex] as
      | TextMessage
      | undefined;
    return message?.content
      ? typeof message.content === "string"
        ? message.content
        : message.content.map((c) => c.text).join("")
      : undefined;
};

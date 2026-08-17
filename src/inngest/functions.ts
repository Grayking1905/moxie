// src/inngest/functions.ts
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "20s");
    //for downloading the cover image
    await step.sleep("wait-for-download", "10s");
    //for saving the cover image
    await step.sleep("wait-for-save", "5s");
    //for generating the book from the cover image and text
    return { message: `hello ${event.data.email}!` };
  }
);
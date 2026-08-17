"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";

const page = () => {
  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: (data) => {
        console.log("Mutation succeeded:", data);
        toast.add({
          title: "job started",
          type: "success",
        });
      },
      onError: (error) => {
        console.error("Mutation failed:", error);
        toast.add({
          title: error.message || "Something went wrong",
          type: "error",
        });
      },
    })
  );
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: "mohit" })}>
        invoke background jobs
      </Button>
    </div>
  );
};

export default page;
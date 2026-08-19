"use client";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const page = () => {
  const [value, setValue] = useState("");
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
    <div className="p-8 max-w-xl mx-auto flex flex-col gap-4">
      <Input
        placeholder="Enter a value..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        disabled={invoke.isPending || !value.trim()}
        onClick={() => invoke.mutate({ value })}
      >
        {invoke.isPending ? "Invoking..." : "Invoke background job"}
      </Button>
    </div>
  );
};

export default page;
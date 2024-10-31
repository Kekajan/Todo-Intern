"use client";
import { Button } from "@/libs/components/button";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen gap-5">
      <h1 className="text-blue-950 font-bold text-4xl">Task ToDo</h1>
      <div>
        <Button
          text="Explore"
          variant="primary"
          onClick={() => {
            router.push("/task");
          }}
        />
      </div>
    </div>
  );
};

export default Page;

"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftFromLine } from "lucide-react";

import { Button } from "./ui/button";

const ButtonBack = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Button
      onClick={handleBack}
      className="bg-sky-600 hover:bg-sky-600/80 focus:bg-sky-600/80 transition-all flex items-center gap-2"
    >
      <ArrowLeftFromLine className="h-6 w-6" />
      Back
    </Button>
  );
};

export default ButtonBack;

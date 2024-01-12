import React from "react";
import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function ErrorCard() {
  return (
    <CardWrapper
     headerLabel="Oops! Something went wrong!"
     backButtonHref="/auth/login"
     backButtonLabel="Back to login"
    >
        <div className="w-full items-center flex justify-center">
        <ExclamationTriangleIcon className="h-6 w-6 text-destructive"  />

        </div>
    </CardWrapper>
  );
}

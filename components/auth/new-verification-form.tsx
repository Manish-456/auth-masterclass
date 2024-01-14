"use client";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export function NewVerificationForm() {
    const searchParams = useSearchParams()
    const  [error, setError] = useState<string | undefined>()
    const  [success, setSuccess] = useState<string | undefined>()

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
      if(success || error) return;
      if(!token){
        setError("Missing token!")
        return;
      }
       newVerification(token).then(data =>  {
        setSuccess(data.success);
        setError(data.error)
       }).catch(()=>setError("Something went wrong"))
    }, [token, error, success]);

    

    useEffect(() => {
        onSubmit();
    }, [onSubmit, success, error]);

    

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center w-full">
       {
        !success && !error && (
          <BeatLoader/>

        )
       }
        <FormSuccess message={success} />
        {
          !success && (
            <FormError message={error} />
          )
        }
      </div>
    </CardWrapper>
  );
}

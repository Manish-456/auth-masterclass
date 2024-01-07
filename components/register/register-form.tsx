"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/schema/index";
import { Button } from "@/components/ui/button";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { register } from "@/actions/register";

type TRegister = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<TRegister>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name : "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: TRegister) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setSuccess(data.success as string);
        setError(data.error as string);
      });
    });

  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      autoComplete="name"
                      type="text"
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      autoComplete="email"
                      type="email"
                      placeholder="johndoe@auth.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="password"
                      autoComplete="password"
                      placeholder="******"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Sign up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
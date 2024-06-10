/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import {
  doesEmailExist,
  signIn,
  signUp,
} from "supertokens-auth-react/recipe/emailpassword";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    email: z.string().email({ message: "Email must be a valid email address" }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
  })
  .strict();

type formType = z.infer<typeof formSchema>;

export default function page() {
  const session = useSessionContext();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: formType) {
    try {
      const { email, password } = values;
      if ((await doesEmailExist({ email })).doesExist) {
        let signInResponse = await signIn({
          formFields: [
            { id: "email", value: email },
            { id: "password", value: password },
          ],
        });
        if (signInResponse.status === "WRONG_CREDENTIALS_ERROR") {
          toast({
            title: "Either Email or Password is incorrect",
            variant: "destructive",
          });
        } else {
          router.replace("/");
        }
      } else {
        let signupResponse = await signUp({
          formFields: [
            { id: "email", value: email },
            { id: "password", value: password },
          ],
        });
        if (signupResponse.status === "OK") {
          router.replace("/");
        } else if (signupResponse.status === "FIELD_ERROR") {
          signupResponse.formFields.forEach((formField) => {
            toast({ title: formField.error, variant: "destructive" });
          });
        } else {
          toast({
            title: "Something went wrong",
            variant: "destructive",
          });
        }
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        window.alert(err.message);
      } else {
        window.alert("Oops! Something went wrong.");
      }
    }
  }

  if (session.loading) {
    return <div>Loading...</div>;
  }

  if (session.doesSessionExist) {
    return redirect("/");
  }

  return (
    <div className="bg-primary h-screen w-screen text-white flex justify-center items-center">
      <div className="bg-secondary w-[500px] p-4 rounded-md shadow-xl">
        <p className="text-xl font-semibold text-center text-white">MeChat</p>
        <p className="mb-4 text-center text-white">Login to continue...</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
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
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-orng py-3 rounded-3xl shadow-xl font-semibold"
              disabled={form.formState.isLoading || form.formState.isSubmitting}
            >
              {form.formState.isLoading || form.formState.isSubmitting
                ? "Loading..."
                : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

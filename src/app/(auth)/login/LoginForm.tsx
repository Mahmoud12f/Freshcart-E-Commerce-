"use client";

import AppButton from "@/components/shared/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {  Mail, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { schemaLogin } from "./loginSchema";
import { handleLogin } from "./login.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginData } from "./loginFormShap";
import Link from "next/link";


export default function LoginForm() {
  const router = useRouter();

  const { handleSubmit, control ,formState: {isSubmitting}} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schemaLogin),
  });

  async function handLogin(data: LoginData) {
  // 1. استخدام await هنا ضروري عشان isSubmitting تشتغل صح
  const result = await signIn("credentials", { 
    ...data, 
    redirect: false 
  });

  if (result?.error) {
    toast.error("Incorrect Email or Password");
  } else {
    toast.success("Welcome back!");
    window.location.href = "/";
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
  return (
  <>
  <form onSubmit={handleSubmit(handLogin)}>
      {/* email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="mb-5">
            <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="off"
              className=" p-6 focus-visible:ring-main-color focus-visible:ring-1"
              type="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {/* Password */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="mb-5">
            <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your password"
              autoComplete="new-password"
              className=" p-6 focus-visible:ring-main-color focus-visible:ring-1"
              type="password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex items-center gap-3">
        <Input type="checkbox" className="w-fit" />

        <span>Keep me signed in</span>
      </div>

      <AppButton
        type="submit"
        disabled={isSubmitting}
        className="w-full p-6 mt-3 font-semibold text-[18px] bg-main-color hover:bg-green-700"
      >
        {isSubmitting ? "Loading..." : <><User className="mr-2" /> Sign In</>}
      </AppButton>

      
    </form>  

   <div className="flex gap-3 justify-center mt-5">
        <p>New to FreshCart?</p>
        <Link href="/register" className="text-main-color font-bold">
        Create an account
        </Link>
      </div>
  </>

   
  );
}

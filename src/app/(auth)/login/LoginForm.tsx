"use client";

import AppButton from "@/components/shared/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, User } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { schemaLogin } from "./loginSchema";
import { handleLogin } from "./login.services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginData } from "./loginFormShap";


export default function LoginForm() {


  const router = useRouter()

  const { handleSubmit, control } = useForm ({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schemaLogin),
  });

 async function handLogin(data:LoginData) {

  
  // location.href="/"
    toast.promise(signIn("credentials" , {...data, redirect: false}), {

      loading: "login....",
      success: function () {
       location.href = "/"
        return "Welcome";
      },
      error:  "Incorrect Email or Password"
     
    });
  }
  return (
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
              placeholder="Login button not working on mobile"
              autoComplete="off"
              className=" p-5 focus-visible:ring-main-color focus-visible:ring-1"
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
              placeholder="Login button not working on mobile"
              autoComplete="new-password"
              className=" p-5 focus-visible:ring-main-color focus-visible:ring-1"
              type="password"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="flex justify-center mb-5">
        <p>
          Already Have Accout?{" "}
          <Link
            href="/login"
            className=" text-main-color hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
      <AppButton
        type="submit"
        className="w-full p-5 font-semibold text-[18px] bg-main-color hover:bg-green-700"
      >
        <User />
        Login
      </AppButton>
    </form>
  );
}

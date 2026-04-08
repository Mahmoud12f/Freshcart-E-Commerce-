"use client"

import AppButton from "@/components/shared/AppButton/AppButton";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Controller, useForm } from "react-hook-form"
import { sendUserData } from "./register.services";

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./register.schema";
import Link from "next/link";



export default function RegisterForm() {
    const {handleSubmit , control} = useForm({
        defaultValues:{
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(schema)
    });
  return (
   <form onSubmit={handleSubmit(sendUserData)}>
    {/* Name */}
    <Controller
    
  name="name"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid} className="mb-5">
      <FieldLabel htmlFor={field.name}>Name*</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Ali"
        autoComplete="off"
        className=" p-5 focus-visible:ring-main-color focus-visible:ring-1"
        type="text"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
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
        placeholder="ali@example.com"
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
        placeholder="create a strong password"
        autoComplete="new-password"
        className=" p-5 focus-visible:ring-main-color focus-visible:ring-1"
        type="password"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
    {/* rePassword */}
    <Controller
  name="rePassword"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid} className="mb-5">
      <FieldLabel htmlFor={field.name}>Confirm Password*</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="confirm your password"
        autoComplete="off"
        className=" p-5 focus-visible:ring-main-color focus-visible:ring-1"
        type="password"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
    {/* phone */}
    <Controller
  name="phone"
  control={control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid} className="mb-5">
      <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
      <Input
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="+12345678900"
        autoComplete="off"
        className=" p-5 focus-visible:ring-main-color focus-visible:ring-1"
        type="tel"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
<div className="flex justify-center mb-5">
    <p>Already Have Accout? <Link href="/login" className=" text-main-color hover:underline font-semibold">Sign In</Link></p>
</div>
<AppButton type="submit" className="w-full p-5 font-semibold text-[18px] bg-main-color hover:bg-green-700"><User/>+ Create My Account</AppButton>
   </form>
  )
}

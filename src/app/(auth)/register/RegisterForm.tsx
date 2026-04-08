"use client"

import AppButton from "@/components/shared/AppButton/AppButton";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Controller, useForm } from "react-hook-form"
import { sendUserData } from "./register.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./register.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterForm() {
    const router = useRouter();
    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        defaultValues: {
            name: "", email: "", password: "", rePassword: "", phone: ""
        },
        resolver: zodResolver(schema)
    });

    async function onSubmit(data: any) {
    const result = await sendUserData(data);

    if (result === true) {
        toast.success("Welcome! Redirecting...");
        window.location.href = "/login"; 
    } else {
        toast.error(result as string);
    }
}
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                            placeholder="Ali"
                            className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Email */}
            <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-5">
                        <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            type="email"
                            placeholder="ali@example.com"
                            className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
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
                            type="password"
                            placeholder="••••••••"
                            className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
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
                            type="password"
                            placeholder="••••••••"
                            className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Phone */}
            <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mb-5">
                        <FieldLabel htmlFor={field.name}>Phone Number*</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            type="tel"
                            placeholder="+201234567890"
                            className="p-5 focus-visible:ring-main-color focus-visible:ring-1"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <div className="flex justify-center mb-5">
                <p>Already Have Account? <Link href="/login" className="text-main-color hover:underline font-semibold">Sign In</Link></p>
            </div>

            <AppButton 
                type="submit" 
                disabled={isSubmitting}
                className="w-full p-5 font-semibold text-[18px] bg-main-color hover:bg-green-700"
            >
                {isSubmitting ? "Loading..." : <><User className="mr-2" /> Create My Account</>}
            </AppButton>
        </form>
    );
}
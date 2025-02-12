"use client";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

const Login = () => {
  const [disabled, setDisabled] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  type FormValues = z.input<typeof formSchema>;

  const onSubmit = async (values: FormValues) => {
    setDisabled(true);
    try {
      const options = {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          role: "admin",
        }),
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
        options
      );
      const data = await response.json();
      console.log(data);
      if (data.status === "error") {
        toast.error(data.message);
        setDisabled(false);
      } else {
        toast.success(data.message);
        localStorage.setItem("authUser", data.data.token);
        Cookies.set("token", data.data.token, { expires: 7, secure: true, sameSite: "Strict" });
        window.location.href = `/`;
      }
    } catch (error: any) {
      toast.error(error.message);
      setDisabled(false);
    }
  };

  return (
    <main className="w-full">
      <div className="flex justify-center items-center min-h-screen h-screen mx-4">
        <div className="flex flex-col w-full max-w-[433px] shrink-0 rounded-2xl shadow-2xl border border-[#DDDDDF] px-7 lg:px-[50px] py-8 bg-white">
          <div className="flex justify-center items-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={140}
              height={140}
              className="my-6"
            />
          </div>
          <h4 className="text-xl lg:text-3xl font-bold mb-1">Log In</h4>
          <p className="text-xs lg:text-sm mb-4 text-[#555555]">
            Enter your email and password below
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        {...field}
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
                  <FormItem className="mb-1">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#E87000]"
                >
                  Forgot password
                </Link>
              </div>
              <Button
                type="submit"
                disabled={disabled}
                className="w-full mt-10"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;

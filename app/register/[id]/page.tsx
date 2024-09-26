"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonBack from "@/components/button-back";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().refine(
    (val) => {
      const date = new Date(val);
      return date instanceof Date && !isNaN(date.valueOf());
    },
    {
      message: "Invalid date of birth.",
    }
  ),
  source: z.string().min(1, {
    message: "Please select a source.",
  }),
});

export default function PageRegister() {
  const router = useRouter();
  const { id } = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: "",
      source: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          dateOfBirth: new Date(data.dateOfBirth).toISOString(),
          source: data.source,
          eventId: id,
        }),
      });

      if (response.ok) {
        toast.success("User registered successfully");
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to register user: ${errorData.error}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  };

  return (
    <>
      <ButtonBack />
      <h2 className="text-3xl font-bold text-center mb-14">
        Event registration
      </h2>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-[500px] mx-auto p-8 bg-sky-200 rounded-md"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-black">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    {...field}
                    className={cn(
                      "w-full text-base",
                      errors.fullName?.message && "border-red-500 bg-red-100"
                    )}
                  />
                </FormControl>
                {errors.fullName?.message &&
                  typeof errors.fullName.message === "string" && (
                    <p className="text-red-500 font-medium text-sm">
                      {errors.fullName.message}
                    </p>
                  )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-black">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className={cn(
                      "w-full text-base",
                      errors.email?.message && "border-red-500 bg-red-100"
                    )}
                  />
                </FormControl>
                {errors.email?.message &&
                  typeof errors.email.message === "string" && (
                    <p className="text-red-500 font-medium text-sm">
                      {errors.email.message}
                    </p>
                  )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-black">
                  Date of Birth
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder="Enter your date of birth"
                    {...field}
                    className={cn(
                      "w-full text-base",
                      errors.dateOfBirth?.message && "border-red-500 bg-red-100"
                    )}
                  />
                </FormControl>
                {errors.dateOfBirth?.message &&
                  typeof errors.dateOfBirth.message === "string" && (
                    <p className="text-red-500 font-medium text-sm">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="text-lg font-medium text-black">
              Where did you hear about this event:
            </FormLabel>
            <div className="flex items-center justify-between mt-6">
              <label className="flex items-center gap-3 text-lg">
                <Input
                  className="w-5 h-5"
                  type="radio"
                  value="social_media"
                  {...register("source")}
                />
                Social media
              </label>
              <label className="flex items-center gap-3 text-lg">
                <Input
                  className="w-5 h-5"
                  type="radio"
                  value="friends"
                  {...register("source")}
                />
                Friends
              </label>
              <label className="flex items-center gap-3 text-lg">
                <Input
                  className="w-5 h-5"
                  type="radio"
                  value="other"
                  {...register("source")}
                />
                Found myself
              </label>
            </div>
            {errors.source?.message &&
              typeof errors.source.message === "string" && (
                <p className="text-red-500 font-medium text-sm">
                  {errors.source.message}
                </p>
              )}
          </div>

          <Button
            type="submit"
            className="bg-sky-600 hover:bg-sky-600/80 focus:bg-sky-600/80 transition-all w-full text-base"
          >
            Register
          </Button>
        </form>
      </Form>
    </>
  );
}

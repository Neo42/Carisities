"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Popover, PopoverContent } from "@/components/ui/Popover";
import { TimePicker } from "@/components/ui/TimePicker";
import { useToast } from "@/components/ui/useToast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverTrigger } from "@radix-ui/react-popover";

import { createAuction } from "./auctionActions";

function isError(x: unknown): x is { message: string; status: string } {
  return Boolean(
    typeof x === "object" &&
      x &&
      "status" in x &&
      typeof x.status === "number" &&
      "message" in x &&
      typeof x.message === "string",
  );
}

const isImageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const extension = parsedUrl.pathname.split(".").pop()?.toLowerCase() ?? "";
    const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
    return validExtensions.includes(extension);
  } catch {
    return false;
  }
};

const formSchema = z.object({
  auctionEnd: z.date(),
  make: z
    .string({
      required_error: "A make is required.",
    })
    .min(2, {
      message: "Make must be at least 2 characters.",
    })
    .max(50, {
      message: "Make must be at most 50 characters.",
    }),
  model: z
    .string({
      required_error: "A model is required.",
    })
    .min(2, {
      message: "Model must be at least 2 characters.",
    })
    .max(50, {
      message: "Model must be at most 50 characters.",
    }),
  color: z
    .string({
      required_error: "A color is required.",
    })
    .min(2, {
      message: "Color must be at least 2 characters.",
    })
    .max(50, {
      message: "Color must be at most 50 characters.",
    }),
  year: z.coerce
    .number()
    .min(1886, {
      message: "A year is required.",
    })
    .max(new Date().getUTCFullYear(), {
      message: `Color must be at most ${new Date().getUTCFullYear()}.`,
    }),
  mileage: z.coerce
    .number({
      required_error: "A mileage is required.",
      invalid_type_error: "A mileage is required.",
    })
    .min(0, {
      message: "Mileage must be at least 0",
    }),
  imageUrl: z
    .string({
      required_error: "A image URL is required.",
    })
    .url({
      message: "Image URL must be a valid image url.",
    })
    .refine(isImageUrl, {
      message: "Image URL must be a valid image url.",
    }),
  reservePrice: z.coerce
    .number({
      required_error: "A reserve price is required.",
    })
    .min(0, { message: "Reserve Price must be least 0." }),
});

export default function ActionForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getUTCFullYear(),
      mileage: 0,
      reservePrice: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const res = await createAuction(data);
      if (res.error) throw res.error;
      router.push(`/auctions/details/${res.id}`);
    } catch (error) {
      if (isError(error)) {
        toast({
          title: "Oops!",
          description: error.status + " " + error.message,
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Make</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the manufacturer of your car.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is the model of your car.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is the color of your car.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={1886}
                  max={new Date().getUTCFullYear()}
                />
              </FormControl>
              <FormDescription>
                This is the year when your car is manufactured.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mileage</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={0} />
              </FormControl>
              <FormDescription>
                This is the mileage of your car.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the image url of your car.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reservePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reserve Price</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={0} />
              </FormControl>
              <FormDescription>
                This is the reserve price of your car.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="auctionEnd"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">DateTime</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}>
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePicker setDate={field.onChange} date={field.value} />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <div>
          <Button type="submit" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

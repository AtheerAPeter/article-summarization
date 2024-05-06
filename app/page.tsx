"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSummerize } from "@/hooks/useSummerize";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import SingleMessage from "@/components/SingleMessage";

interface ISummerizedMessage {
  id: number;
  text: string;
  who: "bot" | "user";
}

export default function Home() {
  const { summerizeMutation } = useSummerize();

  const [summerizedMessages, setSummerizedMessages] = useState<
    ISummerizedMessage[]
  >([]);

  const formSchema = z.object({
    link: z.string().url(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const value = values;
    const temp = summerizedMessages;
    temp.push({
      id: new Date().getTime(),
      text: values.link,
      who: "user",
    });
    setSummerizedMessages(temp);
    form.setValue("link", "");
    const response = await toast.promise(summerizeMutation.mutateAsync(value), {
      loading: "Summerizing...",
      success: "Article summerized successfully!",
      error: "Error summerizing article",
    });
    if (response.text) {
      temp.push({
        id: new Date().getTime(),
        text: response.text,
        who: "bot",
      });
      setSummerizedMessages(temp);
    }
  }

  useEffect(() => {
    console.log(summerizedMessages);
  }, [summerizedMessages]);

  return (
    <div className="container mx-auto pt-2 flex flex-col items-center h-screen py-2">
      <div className="border p-2 overflow-scroll w-full mb-2 rounded-md flex flex-col gap-5 justify-end h-[90vh]">
        {summerizedMessages.map((message) => (
          <SingleMessage
            key={message.id}
            title={message.who}
            text={message.text}
            who={message.who}
          />
        ))}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-3"
        >
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Paste a link of an article to summerize"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={summerizeMutation.isLoading} type="submit">
            send
          </Button>
        </form>
      </Form>
      <p className="text-xs text-gray-700 text-start w-full mt-1">
        Made by Atheer
      </p>
    </div>
  );
}

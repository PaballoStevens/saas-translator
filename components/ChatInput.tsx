'use client'

import { useSession } from "next-auth/react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { User, limitSortedMessagesRef, messageRef } from "@/lib/converters/Message";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/store/store";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

const formSchema = z.object({
  input: z.string().max(1000),
});

function ChatInput({ chatId }: {chatId: string}) {
    const {data: session} = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const subscription = useSubscriptionStore((state) => state.subscription)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            input: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.input.length === 0) {
            return;
        }

        if (!session?.user) {
            return;
        }

        const messages = (await getDocs(limitSortedMessagesRef(chatId))).docs.map(
            (doc) => doc.data()
        ).length;

        const isPro =
        subscription?.role === "pro" && subscription.status === "active";

        if (!isPro && messages >= 20) {
            toast({
                title: "Free plan limit exceeded",
                description: "You have exceeded the FREE plan limit of 20 messages per chat.Upgrade to PRO for unlimited chat messages!",
                variant: "destructive",
                action: (
                    <ToastAction
                    altText="Upgrade"
                    onClick={() => router.push("/register")}>
                       Upgrade to PRO
                    </ToastAction>
                )
            })
        }

        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",
        };

        addDoc(messageRef(chatId), {
            input: values.input,
            timestamp: serverTimestamp(),
            user: userToStore,
        })

        form.reset();
    }

  return (
    <div>
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800"
            >
                <FormField 
                control={form.control}
                name="input"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input
                            className="border-none bg-transparent dark:placeholder:text-white/70"
                            placeholder="Enter message in any language..."
                            {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit" className="bg-violet-600 text-white"> 
                    Send
                </Button>
            </form>
        </Form>
    </div>
  )
}

export default ChatInput
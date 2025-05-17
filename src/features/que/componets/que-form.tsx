"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	queue_id: z.number().min(1),
});

export const QueForm = () => {
	const [cookies, setCookies] = useCookies();

	const form = useForm<z.infer<typeof formSchema>>();
	const onSubmit = (data: z.infer<typeof formSchema>) => {
		// document.cookie = `queue_id=${data.queue_id}`;
		setCookies("queue_id", data.queue_id, {
			path: "/",
			maxAge: 86400,
			secure: true,
			sameSite: "none",
		});
		console.log(process.env.NEXT_PUBLIC_BACKEND_DOMAIN);
		// apiClient.get("/api/me");
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="p-10">
				<FormField
					control={form.control}
					name="queue_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel className={"text-green-600 text-2xl"}>
								待ち番号を入力してください
							</FormLabel>
							<FormControl>
								<Input placeholder="待ち番号" {...field} />
							</FormControl>
							{/*TODO: あとで色を変更*/}
							<FormDescription className={"text-red-600"}>
								待ち番号を入力すると、現在の待ち状況がわかります
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="my-5 flex justify-center">
					<Button type="submit" className={"bg-green-600"}>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};

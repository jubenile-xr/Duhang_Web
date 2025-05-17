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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	queue_id: z.coerce.number().min(1),
	password: z.string().min(1),
});

export const QueForm = () => {
	const [cookies, setCookies] = useCookies();
	const [errorMessage, setErrorMessage] = useState<string>('');

	const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            queue_id: undefined,
            password: "",
        },
    });
	const onSubmit = (data: z.infer<typeof formSchema>) => {
        // 環境変数からパスワードを取得
        const correctPassword = process.env.NEXT_PUBLIC_PASSWORD;
        // パスワードの照合
        if (data.password === correctPassword) {
            // パスワードが正しい場合、Cookieを設定
            setCookies("queue_id", data.queue_id.toString(), { path: "/" });
            setErrorMessage(''); // エラーメッセージをクリア
        } else {
            // パスワードが間違っている場合、エラーメッセージを設定
            setErrorMessage('パスワードが正しくありません');
        }
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
								<Input type="number" placeholder="待ち番号" {...field} />
							</FormControl>
							{/*TODO: あとで色を変更*/}
							<FormDescription className={"text-red-600"}>
								待ち番号を入力すると、現在の待ち状況がわかります
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={"text-green-600 text-2xl"}>
                                パスワードを入力してください
                            </FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="パスワード" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {errorMessage && (
                    <div className="text-red-600 text-center mt-4">
                        <p>{errorMessage}</p>
                    </div>
                )}
				<div className="my-5 flex justify-center">
					<Button type="submit" className={"bg-green-600"}>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};

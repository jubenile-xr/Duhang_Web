"use client"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {FormInput, Save} from "lucide-react";
import {useState} from "react";
import {apiClient} from "@/lib/apiClient";
import {NewRankingData, postRanking} from "@/api/ranking";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

const avatars = {
    "panda": "🐼",
    "rabbit": "🐰",
    "bird": "🐦",
    "mouse": "🐭",
};

// 動物名の配列
const animalsEnum = z.enum(["panda", "rabbit", "bird", "mouse"],{
    errorMap: () => ({ message: "アバターを選択してください" }),
});

const formSchema = z.object({
    name: z.string().min(1, {
        message: "名前は1文字以上入力してください",
    }),
    avatar: animalsEnum,
    score: z.string().min(1, {
        message: "スコアは1以上の数字を入力してください",
    }),
})

const AdminPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            avatar: "panda",
            score: "0",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) =>{
        postRanking(data).then((res)=>{
            console.log(res)
        })
    }
    return(
        <div >
        <div className="my-6 text-center text-green-600">管理画面</div>
        <Card className="m-auto w-2xl">
            <CardHeader>
                <CardTitle className="text-center">新規レコード登録</CardTitle>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>名前</FormLabel>
                                    <FormControl>

                                        <Input placeholder="プレイヤー名" {...field} />
                                    </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name={`avatar`}
                                render={({ field }) => (
                                    <div>
                                        <FormItem>
                                        <FormLabel>
                                            アバター <span className="text-red-500">*</span>
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="アバターを選択" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="panda">🐼</SelectItem>
                                                <SelectItem value="bird">🐦</SelectItem>
                                                <SelectItem value="rabbit">🐰</SelectItem>
                                                <SelectItem value="mouse">🐭</SelectItem>
                                            </SelectContent>
                                        </Select>
                                            <FormMessage />
                                            </FormItem>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="score"
                                render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>スコア</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex my-5 justify-center items-center">
                        <Button className="bg-green-600 hover:bg-green-700" type="submit">
                            <Save className="mr-2 h-4 w-4" />
                            プレイヤーを登録する
                        </Button>
                    </div>
                            </>
                        </form>
                    </Form>
                </CardContent>
            </CardHeader>
        </Card>
        </div>
    )
}

export default AdminPage;

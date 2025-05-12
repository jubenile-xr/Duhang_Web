"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { RankingType } from "@/types/ranking";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {RankingCard} from "@/components/ranking-card";
import {Loading} from "@/components/loading";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	// const [rankingData, setRankingData] = useState<RankingType[]>([]);
	const [smallAnimalRankingData, setSmallAnimalRankingData] = useState<RankingType[]>([]);
	const [pandaRankingData, setPandaRankingData] = useState<RankingType[]>([]);
	const [rabbitRankingData, setRabbitRankingData] = useState<RankingType[]>([]);
	const [birdRankingData, setBirdRankingData] = useState<RankingType[]>([]);
	const [mouseRankingData, setMouseRankingData] = useState<RankingType[]>([]);

	useEffect(() => {
		apiClient.get("").then((res) => {
			const data = res.data;
			console.log(data);
			// setSmallAnimalRankingData(data.filter((item: RankingType) => item.animal === "mouse" || item.animal === "rabbit" || item.animal === "bird").sort((a: RankingType, b: RankingType) => b.score - a.score).slice(0, 10));
			setSmallAnimalRankingData(data.filter((item: RankingType) => item.animal !== "panda").sort((a: RankingType, b: RankingType) => b.score - a.score).slice(0, 10));
			setPandaRankingData(data.filter((item: RankingType) => item.animal === "panda").sort((a: RankingType, b: RankingType) => b.score - a.score).slice(0, 10));
			setRabbitRankingData(data.filter((item: RankingType) => item.animal === "rabbit").sort((a: RankingType, b: RankingType) => b.score - a.score).slice(0, 10));
			setBirdRankingData(data.filter((item: RankingType) => item.animal === "bird").sort((a: RankingType, b: RankingType) => b.score - a.score).slice(0, 10));
			setMouseRankingData(data.filter((item: RankingType) => item.animal === "mouse").sort((a: RankingType, b: RankingType) => b.score - a.score).slice(0, 10));
			setIsLoading(false);
		});
	}, []); // 依存配列を追加して無限ループを防止

	return (
		<div>
			<div className="mb-2 p-1">
				<h2 className="mb-4 text-center text-xl font-medium text-green-500">
					ランキング
				</h2>
				<div className="mb-4 text-center">
					<Link href="/result">
						<Button variant="outline" size="sm" className="gap-1 bg-green-50 hover:bg-green-400 border-green-500">
							最近の試合を見る
						</Button>
					</Link>
				</div>
			</div>


			{isLoading && (
				<Loading/>
			)}

			<Tabs defaultValue="all" className="w-xs sm:w-2xl mx-auto">
				<TabsList className="grid w-full grid-cols-5">
				<TabsTrigger value="all">小動物全体</TabsTrigger>
					<TabsTrigger value="panda">パンダ</TabsTrigger>
					<TabsTrigger value="rabbit">うさぎ</TabsTrigger>
					<TabsTrigger value="bird">鳥</TabsTrigger>
					<TabsTrigger value="mouse">ねずみ</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<RankingCard rankingData={smallAnimalRankingData} />
				</TabsContent>
				<TabsContent value="panda">
					<RankingCard rankingData={pandaRankingData}/>
				</TabsContent>
				<TabsContent value="rabbit">
					<RankingCard rankingData={rabbitRankingData}/>
				</TabsContent>
				<TabsContent value="bird">
					<RankingCard rankingData={birdRankingData}/>
				</TabsContent>
				<TabsContent value="mouse">
					<RankingCard rankingData={mouseRankingData}/>
				</TabsContent>
			</Tabs>

			{!isLoading&& (
				<div className="mt-6 flex animate-bounce items-center justify-center text-2xl">
					<span className="mr-2">🐼</span>
					<span className="mr-2">🐰</span>
					<span className="mr-2">🐦️</span>
					<span>🐭</span>
				</div>
			)}

		</div>
	);
}
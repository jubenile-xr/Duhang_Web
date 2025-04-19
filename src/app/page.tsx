"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { RankingType } from "@/types/ranking";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {RankingCard} from "@/components/RankingCard";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [rankingData, setRankingData] = useState<RankingType[]>([]);
	const [pandaRankingData, setPandaRankingData] = useState<RankingType[]>([]);
	const [rabbitRankingData, setRabbitRankingData] = useState<RankingType[]>([]);
	const [birdRankingData, setBirdRankingData] = useState<RankingType[]>([]);
	const [mouseRankingData, setMouseRankingData] = useState<RankingType[]>([]);

	useEffect(() => {
		apiClient.get("").then((res) => {
			const data = res.data;
			setRankingData(data.sort((a: RankingType, b: RankingType) => b.score - a.score).slice(0, 10));
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
				<div className=" p-4 flex items-center justify-center">
					<Image src="/panda.png" height={40} width={40} alt="Pandatorアイコン" className="mr-2" />
					<h1 className="text-center text-3xl text-green-600">Pandator</h1>
				</div>
				<h2 className="text-center text-xl font-medium text-green-500">
					ランキング
				</h2>
			</div>

			{isLoading && (
				<div className="fixed inset-0 flex items-center justify-center bg-white opacity-75 z-50">
					<div className="flex items-center justify-center text-2xl">
						<span className="mr-2 animate-bounce " style={{ animationDelay: '0ms' }}>🐼</span>
						<span className="mr-2 animate-bounce " style={{ animationDelay: '200ms' }}>🐰</span>
						<span className="mr-2 animate-bounce " style={{ animationDelay: '400ms' }}>🐦️</span>
						<span className="animate-bounce "style={{ animationDelay: '600ms' }}>🐭</span>
					</div>
				</div>
			)}

			<Tabs defaultValue="all" className="w-2xl mx-auto">
				<TabsList className="grid w-full grid-cols-5">
					<TabsTrigger value="all">全体</TabsTrigger>
					<TabsTrigger value="panda">パンダ</TabsTrigger>
					<TabsTrigger value="rabbit">うさぎ</TabsTrigger>
					<TabsTrigger value="bird">鳥</TabsTrigger>
					<TabsTrigger value="mouse">ねずみ</TabsTrigger>
				</TabsList>
				<TabsContent value="all">
					<RankingCard rankingData={rankingData} />
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
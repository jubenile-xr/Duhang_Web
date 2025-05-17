"use client";
import { Loading } from "@/components/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { apiClient } from "@/lib/apiClient";
import { getAnimalIcon } from "@/lib/utils";
import type { RankingType } from "@/types/ranking";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResultPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [rankingData, setRankingData] = useState<RankingType[]>([]);
	const [captureCount, setCaptureCount] = useState(0);

	useEffect(() => {
		apiClient.get("").then((res) => {
			const data = res.data;

			const latestDateTime = data.sort(
				(a: RankingType, b: RankingType) =>
					new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime(),
			)[0]?.dateTime;

			const filteredData = data.filter(
				(item: RankingType) => item.dateTime === latestDateTime,
			);

			setRankingData(filteredData);
			setCaptureCount(
				filteredData.filter(
					(item: RankingType) =>
						item.winner === false && item.animal !== "panda",
				).length,
			);
			setIsLoading(false);
		});
	}, []);

	return (
		<div>
			{isLoading && <Loading />}
			<div className={"sm:mx-100"}>
				<Link href="/">
					<Button variant="outline" size="sm" className="gap-1">
						<ArrowLeft className="h-4 w-4" /> 戻る
					</Button>
				</Link>
			</div>
			<h2 className="m-4 sm:m-auto p-4 text-center text-xl font-medium text-green-500">
				最近のゲーム結果
			</h2>
			<Card className="sm:w-2xl mx-8 sm:m-auto border-green-200">
				<CardHeader className="xs:text-2xl text-center font-bold">
					{rankingData[0]?.dateTime}
					<div>パンダが捕まえた数:{captureCount}</div>
				</CardHeader>
				<CardContent key={0}>
					{rankingData.map((player, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1 }}
						>
							<Card
								className={`my-4 px-3 border-l-4 ${player.animal === "panda" ? "bg-red-50 border-red-200" : player.winner ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"} `}
								key={i}
							>
								<CardContent className={"flex items-center"} key={i}>
									<Avatar className="mr-4">
										<AvatarImage src={getAnimalIcon(player.animal)} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className={"mr-1 xs:mr-4 text-xl xs:text-2xl"}>
										{player.name}
									</div>
									<Badge
										variant="outline"
										className={
											player.animal === "panda"
												? "text-red-500 border-red-200"
												: player.winner
													? "text-green-500 border-green-200"
													: "text-gray-500 border-gray-200"
										}
									>
										{player.animal === "panda"
											? "パンダ"
											: player.winner
												? "生存"
												: "捕獲"}
									</Badge>

									<div className={"w-full text-right"}>
										<div className={"text-sm text-gray-500"}>スコア</div>
										<div className="xs:text-2xl font-bold">950</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default ResultPage;

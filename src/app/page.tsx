"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Medal, Star, Trophy } from "lucide-react";
import { yellow } from "next/dist/lib/picocolors";
import {useEffect, useState} from "react";
import {apiClient} from "@/lib/apiClient";
import {RankingType} from "@/types/ranking";

export default function Home() {
	// const players = [
	// 	{ name: "tyori", animal: "panda", score: 950, day: "2025-10-05" },
	// 	{ name: "manji", animal: "rabbit", score: 900, day: "2025-10-05" },
	// 	{ name: "manji", animal: "rabbit", score: 900, day: "2025-10-05" },
	// 	{ name: "manji", animal: "rabbit", score: 850, day: "2025-10-05" },
	// ];
	const [rankingData,setRankingData] = useState<RankingType[]>([]);

	const getMedalIcon = (i: number) => {
		switch (i) {
			case 0:
				return <Trophy className="h-6 w-6 text-yellow-500" />;
			case 1:
				return <Medal className="h-6 w-6 text-gray-400" />;
			case 2:
				return <Medal className="h-6 w-6 text-amber-600" />;
			default:
				return <Star className="h-5 w-5 text-blue-400" />;
		}
	};

	const getAnimalIcon = (animal: string) => {
		switch (animal) {
			case "panda":
				return "🐼";
			case "rabbit":
				return "🐰";
			case "bird":
				return "🐦";
			case "mouse":
				return "🐭";
		}
	};

	useEffect(()=>{
		apiClient.get("").then((res)=>{
			setRankingData(res.data);
		})

	})

	return (
		<div>
			<div className="mb-6 p-4">
				<h1 className="text-center text-3xl text-green-600">Pandator</h1>
				<h2 className="text-center text-xl font-medium text-green-500 m-6">
					ランキング
				</h2>
			</div>

			<Card className="m-auto w-2xl border-green-200 items-center justify-center text-center">
				{rankingData.map((player, i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className={`flex justify-between items-center w-xl ${i === 0 ? "bg-yellow-100" : i < 3 ? "bg-blue-100" : "bg-gray-50"}`}
					>
						<div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
							{i + 1}
						</div>
						<div className="flex-2">
							<div className="flex items-center ">
								<div className="ml-20 text-3xl">
									{getAnimalIcon(player.animal)}
								</div>
								<div className="ml-10">
									<div className="font-medium text-lg">{player.name}</div>
									<div className="text-xs">{player.day}</div>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-1">
							<div>{getMedalIcon(i)}</div>
							<div className="mr-10 font-medium text-green-500">
								{player.score}
							</div>
						</div>
					</motion.div>
				))}
			</Card>
		</div>
	);
}

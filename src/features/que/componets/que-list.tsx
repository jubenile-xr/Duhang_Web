"use client";
import { FadeInSelection } from "@/components/fade-in-selection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QueForm } from "@/features/que/componets/que-form";
import type { AllQueueSchema, MyQueueSchema } from "@/features/que/type";
import { apiClient } from "@/lib/api-client";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const QueList = () => {
	const [queue, setQueue] = useState<AllQueueSchema | null>(null);
	const [myQueueData, setMyQueueData] = useState<MyQueueSchema | null>(null);
	const [cookies, setCookies, removeCookie] = useCookies(["queue_id"]);
	const [updateCount, setUpdateCount] = useState(0);

	const handleUpdate = () => {
		apiClient.get("/api/all").then((res) => {
			const data = res.data;
			if (data) {
				setQueue(data);
				setUpdateCount(updateCount + 1);
			}
		});
	};
	const handleCancel = () => {
		const queueId = cookies.queue_id;
		removeCookie("queue_id");
		apiClient.delete(`/api/delete?id=${queueId}`).then((res) => {
			apiClient.get("/api/all").then((res) => {
				const data = res.data;
				if (data) {
					setQueue(data);
					setUpdateCount(updateCount + 1);
				}
			});
		});
	};

	let ignore = false;
	useEffect(() => {
		if (ignore) return;

		apiClient.get("/api/all").then((res) => {
			const data = res.data;
			if (data) {
				setQueue(data);
				setUpdateCount(updateCount + 1);
			}
		});
		return () => {
			ignore = true;
		};
	}, [ignore]);

	useEffect(() => {
		if (!cookies.queue_id) return;
		apiClient.get("api/me").then((res) => {
			const data = res.data;
			if (data) {
				setMyQueueData(data);
				setUpdateCount(updateCount + 1);
			}
		});
	}, [cookies]);

	return (
		<FadeInSelection>
			<div className={"flex flex-col items-center m-5"}>
				<Card className={"w-full sm:w-4xl border-green-200"}>
					<>
						{cookies.queue_id ? (
							<>
								<div className={"text-center text-2xl text-green-500"}>
									あなたの番号
								</div>
								<AnimatePresence mode="wait">
									<motion.div key={updateCount}>
										<div className="flex justify-center gap-10">
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.2 }}
											>
												<span className="text-5xl text-red-500">
													{myQueueData?.my_id}
												</span>
											</motion.div>
										</div>
									</motion.div>
								</AnimatePresence>

								<div className={"text-center text-2xl text-green-500"}>
									あなたが呼ばれるまで
								</div>
								<AnimatePresence mode="wait">
									<motion.div key={updateCount}>
										<div className="flex justify-center gap-10">
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.2 }}
											>
												<span className="text-5xl text-blue-500">
													約{myQueueData?.waiting_time_minutes}分
												</span>
											</motion.div>
										</div>
									</motion.div>
								</AnimatePresence>

								<div className={"flex justify-center"}>
									<Button
										className="w-32 bg-red-600 hover:bg-red-700"
										onClick={handleCancel}
									>
										キャンセルする
										<RotateCw />
									</Button>
								</div>
							</>
						) : (
							<QueForm />
						)}
						<div className={"text-center text-2xl text-green-500"}>
							現在お呼びしている番号
						</div>
						<AnimatePresence mode="wait">
							<motion.div key={updateCount}>
								<div className="flex justify-center gap-10">
									{queue?.next_group.map((group, i) => (
										<motion.div
											key={`next-group-${group}`}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.2, delay: i * 0.1 }}
										>
											<span className="text-5xl text-red-500">{group}</span>
										</motion.div>
									))}
								</div>
							</motion.div>
						</AnimatePresence>

						<div className={"text-center text-2xl text-green-500"}>
							次にお呼びする番号
						</div>

						<AnimatePresence mode="wait">
							<motion.div key={updateCount}>
								<div className="flex justify-center gap-10">
									{queue?.next_next_group?.map((group, i) => (
										<motion.div
											key={`next-next-group-${group}`}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: -10 }}
											transition={{ duration: 0.2, delay: i * 0.1 }}
										>
											<span className="text-5xl text-yellow-500">{group}</span>
										</motion.div>
									))}
								</div>
							</motion.div>
						</AnimatePresence>

						<div className={"flex justify-center text-2xl text-green-500"}>
							待ち組数
						</div>
						<div className={"flex justify-center text-5xl text-blue-500"}>
							<AnimatePresence mode="wait">
								<motion.div key={updateCount}>
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
									>
										{queue?.remaining_slots}組
									</motion.div>
								</motion.div>
							</AnimatePresence>
						</div>

						<div className={"flex justify-center text-2xl text-green-500"}>
							合計待ち時間
						</div>
						<div className={"flex justify-center text-5xl text-blue-500"}>
							<AnimatePresence mode="wait">
								<motion.div key={updateCount}>
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2 }}
									>
										{/*{queue?.remaining_slots ? 7 * queue?.remaining_slots : 0}*/}
										約{queue?.total_wait_minutes}分
									</motion.div>
								</motion.div>
							</AnimatePresence>
						</div>
						<div className={"flex justify-center"}>
							<Button
								className="w-24 bg-green-600 hover:bg-green-700"
								onClick={handleUpdate}
							>
								更新する
								<RotateCw />
							</Button>
						</div>
					</>
				</Card>
			</div>
		</FadeInSelection>
	);
};

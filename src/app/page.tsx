"use client";
import { CharacterCard } from "@/components/character-card";
import { FadeInSelection } from "@/components/fade-in-selection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QueList } from "@/features/que/componets/que-list";
import { getS3Url } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TutorialPage = () => {
	const infiniteAnimalVariants = {
		jump: {
			y: [0, -30, 0],
			transition: {
				duration: 1,
				ease: "easeInOut",
				times: [0, 0.5, 1],
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 0.2,
			},
		},
		fly: {
			x: [-10, 60, -10],
			y: [0, -50, 10, -30, 0],
			scale: [1, 1.2, 1, 1.2, 1],
			transition: {
				x: {
					duration: 6,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				},
				y: {
					duration: 3,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				},
				scale: {
					duration: 0.3,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				},
			},
		},
		climb: {
			y: [0, -20, 0],
			x: [0, 5, -5, 5, -5, 0],
			scale: [1, 1.1, 0.9, 1.1, 0.9, 1],
			transition: {
				y: {
					duration: 3,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				},
				x: {
					duration: 1,
					repeat: Number.POSITIVE_INFINITY,
					times: [0, 0.2, 0.4, 0.6, 0.8, 1],
				},
				scale: {
					duration: 4,
					repeat: Number.POSITIVE_INFINITY,
				},
			},
		},
	};

	return (
		<div className={"flex flex-col justify-center items-center"}>
			<FadeInSelection>
				<h1 className={"text-4xl text-green-500 font-medium"}>
					チュートリアル
				</h1>
				<div className="m-4 text-center">
					<Link href="/ranking">
						<Button
							variant="outline"
							size="sm"
							className="gap-1 bg-green-50 hover:bg-green-400 border-green-500"
						>
							ランキングを見る
						</Button>
					</Link>
				</div>
			</FadeInSelection>

			<FadeInSelection>
				<h2 className={"my-5 text-2xl text-green-500 font-medium"}>
					ストーリー
				</h2>
			</FadeInSelection>
			<FadeInSelection>
				<Card className={"sm:w-4xl mx-5"}>
					<CardHeader>
						<div
							className={
								"flex justify-center text-2xl text-green-500 font-medium"
							}
						>
							パンダから逃げろ！
						</div>
					</CardHeader>
					<CardContent className={"flex flex-col justify-center gap-6"}>
						<Image
							src={getS3Url("/pandator-scene.png")}
							alt={"pandator-scene"}
							width={800}
							height={200}
							className={"mx-auto"}
						/>
						<div className={"text-center text-xl"}>ある館での出来事...</div>
						<div className={"text-center text-xl"}>
							小動物達はパンダに捕まってしまい、檻に閉じこめられてしまった。
						</div>
						<div className={"text-center text-xl"}>
							なんとか小動物達は檻を脱出したが、帰宅したパンダに見つかってしまう...
						</div>
						<div className={"text-center text-xl"}>
							果たして小動物達はパンダから逃げ切れるのか!?
						</div>
					</CardContent>
				</Card>
			</FadeInSelection>

			<FadeInSelection>
				<h2 className={"my-10 text-2xl text-green-500 font-medium"}>
					基本ルール
				</h2>
			</FadeInSelection>

			<FadeInSelection>
				<Card
					className={
						"sm:w-4xl mx-5 px-2 flex flex-col justify-center items-center"
					}
				>
					<div className={"text-2xl font-bold"}>パンダ</div>
					<div>
						パンダは、逃げ回る小動物達を銃で網を放ち、小動物を捕まえましょう！
					</div>
					<div className={"text-2xl font-bold"}>小動物</div>
					<div>小動物達は、パンダから捕まらないように逃げ切りましょう！</div>
					<div>また、他の小動物へ妨害をして、自分が逃げ切りましょう！</div>
				</Card>
			</FadeInSelection>

			<FadeInSelection>
				<h2 className={"my-10 text-2xl text-green-500 font-medium"}>
					動物毎の操作方法
				</h2>
			</FadeInSelection>

			<div className={"gap-6"}>
				<FadeInSelection>
					<CharacterCard animal={"panda"}>
						<div className={"flex flex-col items-center gap-6"}>
							<div className={"text-2xl font-bold"}>キャラクター選択</div>
							<div>銃に接続されているAとBボタンを押してください。</div>
							<Image
								src={getS3Url("/tutorial/game/select.png")}
								alt={"キャラクター選択画面"}
								width={400}
								height={400}
							/>
						</div>
						<div className={"my-8 flex flex-col  items-center gap-6"}>
							<div className={"text-2xl font-bold"}>パンダの操作</div>
							<div>銃の引き金を引くと網が発射！</div>
							<Image
								src={getS3Url("/tutorial/game/PandaShotGame.gif")}
								alt={"網が出ている様子"}
								width={400}
								height={400}
							/>
							{/*<div>小動物が網の中に入るように、狙い撃て!</div>*/}
							{/*<Image src="/RabbitReal.gif" alt={"動物が捕まっている様子"} width={400} height={400}/>*/}
						</div>
					</CharacterCard>
				</FadeInSelection>

				<FadeInSelection>
					<CharacterCard animal={"rabbit"}>
						<div className={"flex flex-col items-center gap-6"}>
							<div className={"text-2xl font-bold"}>キャラクター選択</div>
							<div>選択画面からRabbitを選んでください。</div>
							<Image
								src={getS3Url("/tutorial/game/select.png")}
								alt={"ウサギを選択してる画像"}
								width={400}
								height={400}
							/>
						</div>

						<div className={"my-8 flex flex-col  items-center gap-6"}>
							<div className={"text-2xl font-bold"}>ウサギの操作</div>
							<div className={"flex justify-center gap-6"}>
								<div>腕を振って走ろう!</div>
							</div>
							<div className={"flex"}>
								<div className={"mx-auto flex flex-col gap-1"}>
									<Image
										src={getS3Url("/tutorial/real/WalkAction.gif")}
										alt={"腕を振ってる画像"}
										width={400}
										height={400}
									/>
									{/*<Image src="/RabbitReal.gif" alt={"ゲーム内でジャンプしてる画像"} width={400}*/}
									{/*       height={400}/>*/}
								</div>
							</div>

							<div className={"flex justify-center gap-6"}>
								<div>Aボタンを押しながら腕を大きく振ってジャンプ!</div>
								<motion.div variants={infiniteAnimalVariants} animate="jump">
									<span className={"text-2xl"}>🐇</span>
								</motion.div>
							</div>
							<div className={"flex relative"}>
								<div className={"mx-auto flex flex-col gap-1"}>
									<Image
										src={getS3Url("/tutorial/real/RabbitReal.gif")}
										alt={"real"}
										width={400}
										height={400}
									/>
									{/*TODO: rabbitのゲーム動画*/}
									{/*<Image src="/RabbitReal.gif" alt={"game"} width={400} height={400}/>*/}
								</div>
							</div>
						</div>
					</CharacterCard>
				</FadeInSelection>

				<FadeInSelection>
					<CharacterCard animal={"bird"}>
						<div className={"flex flex-col items-center gap-6"}>
							<div className={"text-2xl font-bold"}>キャラクター選択</div>
							<div>選択画面からBirdを選んでください。</div>
							<Image
								src={getS3Url("/tutorial/game/select.png")}
								alt={"鳥を選択してる画像"}
								width={400}
								height={400}
							/>
						</div>
						<div className={"my-8 flex flex-col  items-center gap-6"}>
							<div className={"text-2xl font-bold"}>鳥の操作</div>
							<div className={"flex justify-center gap-6"}>
								<div>右スティックで歩こう！</div>
							</div>
							<div className={"flex relative"}>
								<div className={"mx-auto flex gap-1"}>
									<Image
										src={getS3Url("/tutorial/real/WalkAction.gif")}
										alt={"ゲーム内で歩いてる画像"}
										width={400}
										height={400}
									/>
								</div>
							</div>

							<div className={"flex justify-center gap-6"}>
								<div>腕をバタバタさせて空を飛ぼう!</div>
								<motion.div variants={infiniteAnimalVariants} animate="fly">
									<span className={"text-2xl"}>🕊</span>
								</motion.div>
							</div>
							<div className={"flex relative"}>
								<div className={"mx-auto flex flex-col gap-3"}>
									<Image
										src={getS3Url("/tutorial/real/BirdFlyReal.gif")}
										alt={"腕をバタバタさせてる様子"}
										width={400}
										height={400}
									/>
									<Image
										src={getS3Url("/tutorial/game/BirdFly.gif")}
										alt={"鳥が飛んでる画像"}
										width={400}
										height={400}
									/>
								</div>
							</div>
						</div>
					</CharacterCard>
				</FadeInSelection>

				<FadeInSelection>
					<CharacterCard animal={"mouse"}>
						<div className={"flex flex-col items-center gap-6"}>
							<div className={"text-2xl font-bold"}>キャラクター選択</div>
							<div>選択画面からMouseを選んでください。</div>
							<Image
								src={getS3Url("/tutorial/game/select.png")}
								alt={"ネズミを選択してる画像"}
								width={400}
								height={400}
							/>
						</div>
						<div className={"my-8 flex flex-col  items-center gap-6"}>
							<div className={"text-2xl font-bold"}>ネズミの操作</div>
							<div className={"flex justify-center gap-6"}>
								<div>腕を振って歩こう！</div>
							</div>
							<div className={"flex relative"}>
								<div className={"mx-auto flex gap-1"}>
									<Image
										src={getS3Url("/tutorial/real/WalkAction.gif")}
										alt={"腕を振ってる画像"}
										width={400}
										height={400}
									/>
								</div>
							</div>

							<div className={"flex justify-center gap-6"}>
								<div>壁に向かって腕を振って壁を登ろう!</div>
								<motion.div variants={infiniteAnimalVariants} animate="climb">
									<span className={"text-2xl"}>🐀</span>
								</motion.div>
							</div>
							<div className={"flex relative"}>
								<div className={"mx-auto flex flex-col gap-1"}>
									<Image
										src={getS3Url("/tutorial/real/MouseClimbReal.gif")}
										alt={"腕を振っている様子"}
										width={400}
										height={400}
									/>
									<Image
										src={getS3Url("/tutorial/game/MouseClimb.gif")}
										alt={"ネズミが壁を登っている様子"}
										width={400}
										height={400}
									/>
								</div>
							</div>
						</div>
					</CharacterCard>
				</FadeInSelection>
			</div>

			{/*<Card className={"w-4xl flex flex-col p-0 border-green-200 border-"}>*/}
			{/*    <CardHeader className={"bg-blue-50  items-center"}>*/}
			{/*        <div className="flex">*/}
			{/*            <Avatar className={"size-10"}>*/}
			{/*                <AvatarImage src={"rabbit.png"}/>*/}
			{/*                <AvatarFallback>CN</AvatarFallback>*/}
			{/*            </Avatar>*/}
			{/*            <div className={"text-4xl"}>Rabbit</div>*/}
			{/*        </div>*/}
			{/*    </CardHeader>*/}
			{/*    <div className={"flex relative"}>*/}
			{/*        <div className={"mx-auto flex gap-1"}>*/}
			{/*            <Image src="/RabbitReal.gif" alt={"real"} width={400} height={400}/>*/}
			{/*            <Image src="/RabbitReal.gif" alt={"game"} width={400} height={400}/>*/}
			{/*        </div>*/}
			{/*    </div>*/}
			{/*    <div className={"flex justify-center gap-6"}>*/}
			{/*        <h3>腕を大きく振ってジャンプ!</h3>*/}
			{/*        <motion.div*/}
			{/*            variants={infiniteJumpVariants}*/}
			{/*            animate="jump"*/}
			{/*        >*/}
			{/*            <span className={"text-2xl"}>🐇</span>*/}
			{/*        </motion.div>*/}
			{/*    </div>*/}

			{/*</Card>*/}
		</div>
	);
};

export default TutorialPage;

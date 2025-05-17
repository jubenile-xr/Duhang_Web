import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAnimalIcon } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";

interface CharacterCardProps {
	animal: string;
	children?: React.ReactNode;
}

export const CharacterCard = (props: CharacterCardProps) => {
	// const infiniteJumpVariants = {
	//     jump: {
	//         y: [0, -30, 0],
	//         transition: {
	//             duration: 1,
	//             ease: "easeInOut",
	//             times: [0, 0.5, 1],
	//             repeat: Infinity,
	//             repeatDelay: 0.2
	//         }
	//     }
	// };
	const getAnimalName = (animal: string) => {
		switch (animal) {
			case "panda":
				return "パンダ";
			case "rabbit":
				return "ウサギ";
			case "bird":
				return "鳥";
			case "mouse":
				return "ネズミ";
			default:
				return animal;
		}
	};

	const getAnimalTheme = (animal: string) => {
		switch (animal) {
			case "panda":
				return "bg-green-50";
			case "rabbit":
				return "bg-red-50";
			case "bird":
				return "bg-blue-50";
			case "mouse":
				return "bg-yellow-50";
			default:
				return animal;
		}
	};
	return (
		<Card className={"sm:w-4xl flex flex-col my-4 p-0 mx-3 border-green-200"}>
			<CardHeader
				className={`bg-blue-50  items-center ${getAnimalTheme(props.animal)}`}
			>
				<div className="flex">
					<Avatar className={"size-10"}>
						<AvatarImage src={getAnimalIcon(props.animal)} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className={"text-4xl"}>{getAnimalName(props.animal)}</div>
				</div>
			</CardHeader>
			<CardContent>{props.children}</CardContent>
			{/*<div className={"flex relative"}>*/}
			{/*    <div className={"mx-auto flex gap-1"}>*/}
			{/*        <Image src="/RabbitReal.gif" alt={"real"} width={400} height={400}/>*/}
			{/*        <Image src="/RabbitReal.gif" alt={"game"} width={400} height={400}/>*/}
			{/*    </div>*/}
			{/*</div>*/}
			{/*<div className={"flex justify-center gap-6"}>*/}
			{/*    <h3>腕を大きく振ってジャンプ!</h3>*/}
			{/*    <motion.div*/}
			{/*        variants={infiniteJumpVariants}*/}
			{/*        animate="jump"*/}
			{/*    >*/}
			{/*        <span className={"text-2xl"}>🐇</span>*/}
			{/*    </motion.div>*/}
			{/*</div>*/}
		</Card>
	);
};

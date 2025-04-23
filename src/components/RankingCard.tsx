import {motion} from "framer-motion";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card} from "@/components/ui/card";
import {RankingType} from "@/types/ranking";
import {Medal, Star, Trophy} from "lucide-react";

interface Props {
    rankingData:  RankingType[]
}

const getAnimalIcon = (animal: string) => {
    switch (animal) {
        case "panda":
            return "panda.png";
        case "rabbit":
            return "rabbit.png";
        case "bird":
            return "bird.png";
        case "mouse":
            return "mouse.png";
        default:
            return "panda.png";
    }
};

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

export const RankingCard =(props:Props)=>{
    const {rankingData }= props;
    return (
        <Card className="px-3 border-green-200 items-center justify-center text-center">
            {rankingData.map((player, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`w-full flex justify-between items-center p-1 h-14 xs:h-12 rounded-xl my-2 ${i === 0 ? "bg-yellow-100" : i < 3 ? "bg-blue-100" : "bg-gray-50"}`}
                >
                    <div className="xs:ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                        {i + 1}
                    </div>
                    <div className="flex-1 ">
                        <div className="flex items-center justify-center w-full">
                            <div className="mr-6">
                                <Avatar>
                                    <AvatarImage src={getAnimalIcon(player.animal)} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <div className="font-medium text-lg ">{player.name}</div>
                                <div className="text-xs">{player.dateTime}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-1">
                        <div>{getMedalIcon(i)}</div>
                        <div className=" font-medium text-green-500">
                            {player.score}
                        </div>
                    </div>
                </motion.div>
            ))}
        </Card>
    )
}
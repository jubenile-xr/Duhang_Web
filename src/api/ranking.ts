"use server"

import {apiClient} from "@/lib/apiClient";

export interface NewRankingData {
    name?: string;
    avatar?: string;
    score?: string;
}

export const postRanking = async (reqData: NewRankingData) => {
    apiClient.post("", {
        name: reqData?.name,
        animal: reqData?.avatar,
        score: Number(reqData?.score),
    }).then((res)=>{
        console.log(res.data)
    }).catch((err)=>{
        console.error(err);
    })
}
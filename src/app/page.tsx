"use client"
import {useEffect} from "react";

export default function Home() {
  const a = 0
  useEffect(() => {
    console.log(a)
  }, [a]);
  return <div>a</div>;
}

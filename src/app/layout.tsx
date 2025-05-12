import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<head>
			<link rel="icon" href="icon.png" sizes="any"/>
		</head>
		<body className="max-h-screen bg-green-50">
		<Link href={"/"}>
		<div className="p-4 w-full flex items-center justify-center">
			<Image src="/icon/panda.png" height={40} width={40} alt="Pandatorアイコン" className="mr-2"/>
			<h1 className="text-center text-3xl text-green-600">Pandator</h1>
		</div>
		</Link>
		{children}
		</body>
		</html>
	);
}

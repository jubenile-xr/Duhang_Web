import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

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
		<div className="p-4 w-full flex items-center justify-center">
			<Image src="/panda.png" height={40} width={40} alt="Pandatorアイコン" className="mr-2"/>
			<h1 className="text-center text-3xl text-green-600">Pandator</h1>
		</div>
		{children}
		</body>
		</html>
	);
}

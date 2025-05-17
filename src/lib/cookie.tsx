"use client";
import { CookiesProvider } from "react-cookie";

export const CustomCookieProvider = ({
	children,
}: { children: React.ReactNode }) => {
	return <CookiesProvider>{children}</CookiesProvider>;
};

"use client";
import { CookiesProvider } from "react-cookie";
import type { CookieSetOptions } from "universal-cookie";

export const CustomCookieProvider = ({
	children,
}: { children: React.ReactNode }) => {
	return <CookiesProvider>{children}</CookiesProvider>;
};

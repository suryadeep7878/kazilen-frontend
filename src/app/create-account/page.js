"use client";
import { Suspense } from "react";
import CreateAccountClient from "./CreateAccountClient";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function Page() {
	const param = useSearchParams();
	const phone = param.get("phone");
	return (
			<CreateAccountClient phoneFromQuery={phone} />
	);
}

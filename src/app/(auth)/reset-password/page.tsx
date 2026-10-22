import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/button";
import ResetPasswordForm from "./ResetPasswordForm";

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string | string[]; error?: string | string[] }>;
}) {
	const { token, error } = await searchParams;
	const resetToken = Array.isArray(token) ? token[0] : token;

	if (error || !resetToken) {
		return (
			<div className="flex flex-col items-center justify-center grow p-4 text-center">
				<h1 className="mb-4 text-2xl font-bold text-gray-800">Invalid or expired link</h1>
				<p className="mb-4 text-gray-600">Please request a new password reset link.</p>
				<Link href="/forgot-password" className={buttonVariants({ variant: "default" })}>
					Request new link
				</Link>
			</div>
		);
	}

	return <ResetPasswordForm token={resetToken} />;
}

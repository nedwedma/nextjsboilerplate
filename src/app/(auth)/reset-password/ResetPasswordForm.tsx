"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { resetPasswordSchema } from "@/src/lib/zod";
import { authClient } from "@/src/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type ResetField = "password" | "confirmPassword";

export default function ResetPasswordForm({ token }: { token: string }) {
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [formErrors, setFormErrors] = useState<Partial<Record<ResetField, string>>>({});

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormErrors({});

		const validationResult = resetPasswordSchema.safeParse({ password, confirmPassword });

		if (!validationResult.success) {
			const errors: Partial<Record<ResetField, string>> = {};
			validationResult.error.issues.forEach(err => {
				const field = err.path[0] as ResetField;
				errors[field] ??= err.message;
			});
			setFormErrors(errors);
			return;
		}

		setIsPending(true);
		const { error } = await authClient.resetPassword({
			newPassword: validationResult.data.password,
			token,
		});
		setIsPending(false);

		if (error) {
			toast.error(error.message ?? "Could not reset password.");
			return;
		}

		toast.success("Your password has been reset. Please sign in.");
		router.push("/sign-in");
	};

	return (
		<div className="grow flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Reset Password
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="password">New password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="new-password"
								placeholder="••••••••"
								disabled={isPending}
							/>
							{formErrors.password && <p className="text-xs text-red-600 mt-1">{formErrors.password}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">Confirm new password</Label>
							<Input
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								autoComplete="new-password"
								placeholder="••••••••"
								disabled={isPending}
							/>
							{formErrors.confirmPassword && <p className="text-xs text-red-600 mt-1">{formErrors.confirmPassword}</p>}
						</div>
						<Button type="submit" disabled={isPending} className="w-full">
							{isPending ? (
								<Loader2 size={16} className="animate-spin mr-2" />
							) : null}
							Reset password
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

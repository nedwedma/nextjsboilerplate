"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { forgotPasswordSchema } from "@/src/lib/zod";
import { authClient } from "@/src/lib/auth-client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [formErrors, setFormErrors] = useState<{ email?: string }>({});

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormErrors({});

		const validationResult = forgotPasswordSchema.safeParse({ email });

		if (!validationResult.success) {
			const errors: { email?: string } = {};
			validationResult.error.issues.forEach(err => {
				if (err.path.includes('email')) errors.email = err.message;
			});
			setFormErrors(errors);
			return;
		}

		setIsPending(true);
		const { error } = await authClient.forgetPassword({
			email: validationResult.data.email,
			redirectTo: "/reset-password",
		});

		if (error) {
			toast.error(error.message);
			setFormErrors({ email: error.message });
		} else {
			toast.success("If an account exists with this email, you will receive a password reset link.");
		}
		setIsPending(false);
	};

	return (
		<div className="grow flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Forgot Password
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete="email"
								disabled={isPending}
							/>
							{formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
						</div>
						<Button type="submit" disabled={isPending} className="w-full">
							{isPending ? (
								<Loader2 size={16} className="animate-spin mr-2" />
							) : null}
							Send Reset Link
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
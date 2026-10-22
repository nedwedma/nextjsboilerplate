"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { signInSchema } from "@/src/lib/zod";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignInForm({ callbackUrl }: { callbackUrl: string }) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pendingCredentials, setPendingCredentials] = useState(false);
	const [pendingGoogle, setPendingGoogle] = useState(false);
	const [pendingResend, setPendingResend] = useState(false);
	const [emailNotVerified, setEmailNotVerified] = useState(false);
	const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

	const handleCredentialsSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormErrors({});
		setEmailNotVerified(false);

		const validationResult = signInSchema.safeParse({ email, password });

		if (!validationResult.success) {
			const errors: { email?: string; password?: string } = {};
			validationResult.error.issues.forEach(err => {
				if (err.path.includes('email')) errors.email = err.message;
				if (err.path.includes('password')) errors.password = err.message;
			});
			setFormErrors(errors);
			return;
		}

		setPendingCredentials(true);
		await authClient.signIn.email(
			{
				email: validationResult.data.email,
				password: validationResult.data.password,
			},
			{
				onSuccess: () => {
					router.push(callbackUrl);
					router.refresh();
				},
				onError: (ctx) => {
					if (ctx.error.code === "EMAIL_NOT_VERIFIED") {
						setEmailNotVerified(true);
						return;
					}
					toast.error(ctx.error.message ?? "Sign in failed.");
					setFormErrors({ password: ctx.error.message });
				},
				onResponse: () => {
					setPendingCredentials(false);
				}
			}
		);
	};

	const handleResendVerification = async () => {
		setPendingResend(true);
		const { error } = await authClient.sendVerificationEmail({
			email,
			callbackURL: "/email-verified",
		});
		setPendingResend(false);

		if (error) {
			toast.error(error.message ?? "Could not send verification email.");
		} else {
			toast.success("Verification email sent. Please check your inbox.");
		}
	};

	const handleSignInWithGoogle = async () => {
		setPendingGoogle(true);
		await authClient.signIn.social(
			{
				provider: "google",
				callbackURL: callbackUrl,
			},
			{
				onError: (ctx) => {
					toast.error(ctx.error.message ?? "Google sign in failed.");
				},
				onResponse: () => {
					setPendingGoogle(false);
				}
			}
		);
	};

	return (
		<div className="grow flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Sign In
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleCredentialsSignIn} className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								autoComplete="email"
								disabled={pendingCredentials}
							/>
							{formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="current-password"
								placeholder="••••••••"
								disabled={pendingCredentials}
							/>
							{formErrors.password && <p className="text-xs text-red-600 mt-1">{formErrors.password}</p>}
						</div>
						{emailNotVerified && (
							<div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 space-y-2">
								<p>Please verify your email address before signing in.</p>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={handleResendVerification}
									disabled={pendingResend}
								>
									{pendingResend ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
									Resend verification email
								</Button>
							</div>
						)}
						<Button type="submit" disabled={pendingCredentials} className="w-full">
							{pendingCredentials ? (
								<Loader2 size={16} className="animate-spin mr-2" />
							) : null}
							Sign in
						</Button>
					</form>

					<div className="mt-4">
						<Button
							variant="outline"
							className="w-full"
							onClick={handleSignInWithGoogle}
							disabled={pendingGoogle}
						>
							{pendingGoogle ? (
								<Loader2 size={16} className="animate-spin mr-2" />
							) : (
								<span className="mr-2">G</span>
							)}
							Continue with Google
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						<Link
							href="/forgot-password"
							className="text-primary hover:underline"
						>
							Forgot password?
						</Link>
					</div>
					<div className="mt-2 text-center text-sm">
						No account yet?{" "}
						<Link href="/sign-up" className="text-primary hover:underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

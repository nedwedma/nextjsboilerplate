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

export default function SignIn() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pendingCredentials, setPendingCredentials] = useState(false);
	const [pendingGoogle, setPendingGoogle] = useState(false);
	const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

	const handleCredentialsSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormErrors({});

		const validationResult = signInSchema.safeParse({ email, password });

		if (!validationResult.success) {
			const errors: { email?: string; password?: string } = {};
			validationResult.error.errors.forEach(err => {
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
				onSuccess: async () => {
					router.push("/");
				},
				onError: (ctx) => {
					toast.error(ctx.error.message ?? "Login fehlgeschlagen.");
					setFormErrors({ email: " ", password: ctx.error.message });
				},
				onResponse: () => {
					setPendingCredentials(false);
				}
			}
		);
	};

	const handleSignInWithGoogle = async () => {
		setPendingGoogle(true);
		await authClient.signIn.social(
			{
				provider: "google",
			},
			{
				onSuccess: async () => {
					router.push("/");
				},
				onError: (ctx) => {
					toast.error(ctx.error.message ?? "Google Login fehlgeschlagen.");
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
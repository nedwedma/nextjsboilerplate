"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignUp() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pending, setPending] = useState(false);
	const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormErrors({});

		const errors: { email?: string; password?: string } = {};
		if (!email) {
			errors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = "Invalid email address";
		}
		if (!password) {
			errors.password = "Password is required";
		} else if (password.length < 8) {
			errors.password = "Password must be at least 8 characters";
		}

		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);
			return;
		}

		setPending(true);
		await authClient.signUp.email(
			{
				email,
				password,
				name: "",
			},
			{
				onSuccess: () => {
					toast.success("Success! Please verify your email.");
					router.push("/");
				},
				onError: (ctx) => {
					toast.error(ctx.error.message ?? "Sign up failed.");
					if (ctx.error.message.toLowerCase().includes('email')) {
						setFormErrors({ email: ctx.error.message });
					} else {
						setFormErrors({ password: ctx.error.message });
					}
				},
				onResponse: () => {
					setPending(false);
				}
			}
		);
	};

	return (
		<div className="grow flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-3xl font-bold text-center text-gray-800">
						Create Account
					</CardTitle>
					<CardDescription className="text-center text-sm text-gray-600">
						Enter your email and password to sign up.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp} className="space-y-6">
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
								disabled={pending}
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
								autoComplete="new-password"
								placeholder="••••••••"
								disabled={pending}
							/>
							{formErrors.password && <p className="text-xs text-red-600 mt-1">{formErrors.password}</p>}
						</div>
						<Button type="submit" disabled={pending} className="w-full">
							{pending ? (
								<Loader2 size={16} className="animate-spin mr-2" />
							) : null}
							Sign up
						</Button>
					</form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/sign-in" className="text-primary hover:underline">
							Sign in
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { signUpSchema } from "@/src/lib/zod";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type SignUpField = "name" | "email" | "password" | "confirmPassword";

export default function SignUp() {
	const router = useRouter();
	const [values, setValues] = useState<Record<SignUpField, string>>({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [pending, setPending] = useState(false);
	const [formErrors, setFormErrors] = useState<Partial<Record<SignUpField, string>>>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues(prev => ({ ...prev, [name]: value }));
	};

	const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormErrors({});

		const validationResult = signUpSchema.safeParse(values);

		if (!validationResult.success) {
			const errors: Partial<Record<SignUpField, string>> = {};
			validationResult.error.issues.forEach(err => {
				const field = err.path[0] as SignUpField;
				errors[field] ??= err.message;
			});
			setFormErrors(errors);
			return;
		}

		const { name, email, password } = validationResult.data;

		setPending(true);
		await authClient.signUp.email(
			{
				name,
				email,
				password,
				callbackURL: "/email-verified",
			},
			{
				onSuccess: () => {
					toast.success("Success! Please verify your email.");
					router.push("/");
				},
				onError: (ctx) => {
					toast.error(ctx.error.message ?? "Sign up failed.");
					if (ctx.error.message?.toLowerCase().includes('email')) {
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
						Enter your details to sign up.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSignUp} className="space-y-6">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								name="name"
								placeholder="Jane Doe"
								required
								onChange={handleChange}
								value={values.name}
								autoComplete="name"
								disabled={pending}
							/>
							{formErrors.name && <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="m@example.com"
								required
								onChange={handleChange}
								value={values.email}
								autoComplete="email"
								disabled={pending}
							/>
							{formErrors.email && <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								required
								value={values.password}
								onChange={handleChange}
								autoComplete="new-password"
								placeholder="••••••••"
								disabled={pending}
							/>
							{formErrors.password && <p className="text-xs text-red-600 mt-1">{formErrors.password}</p>}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="confirmPassword">Confirm password</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								value={values.confirmPassword}
								onChange={handleChange}
								autoComplete="new-password"
								placeholder="••••••••"
								disabled={pending}
							/>
							{formErrors.confirmPassword && <p className="text-xs text-red-600 mt-1">{formErrors.confirmPassword}</p>}
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

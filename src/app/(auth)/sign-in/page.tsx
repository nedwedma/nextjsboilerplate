import { getSafeCallbackUrl } from "@/src/lib/safe-redirect";
import SignInForm from "./SignInForm";

export default async function SignInPage({
	searchParams,
}: {
	searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
	const { callbackUrl } = await searchParams;

	return <SignInForm callbackUrl={getSafeCallbackUrl(callbackUrl)} />;
}

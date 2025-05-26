import UsersTable from "@/src/components/admin/users-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Header from "@/src/components/navigation/Header";
import prisma from "@/src/lib/prisma";

export default async function AdminDashboard() {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			name: true,
			role: true,
			emailVerified: true,
			createdAt: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<main className="flex flex-col">
			<Header />
			<div className="flex flex-col gap-4 max-w-7xl mx-auto w-full mt-10">
				<div className="flex flex-col gap-2 mb-8">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
					<p className="text-muted-foreground">
						Manage users and view system statistics
					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Users</CardTitle>
					</CardHeader>
					<CardContent>
						<UsersTable users={users} />
					</CardContent>
				</Card>
			</div>
		</main>
	);
} 
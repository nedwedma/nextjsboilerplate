import UsersTable from "@/src/components/admin/users-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import Header from "@/src/components/navigation/Header";
import prisma from "@/src/lib/prisma";
import Link from "next/link";
import { Users, Images, ArrowRight } from "lucide-react";

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
						Manage users, images and view system statistics
					</p>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<Card className="hover:shadow-md transition-shadow">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="p-2 bg-blue-100 rounded-lg">
										<Users className="h-6 w-6 text-blue-600" />
									</div>
									<div>
										<h3 className="font-semibold text-lg">User Management</h3>
										<p className="text-sm text-gray-600">Manage user accounts and permissions</p>
									</div>
								</div>
								<ArrowRight className="h-5 w-5 text-gray-400" />
							</div>
						</CardContent>
					</Card>

					<Link href="/admin/images">
						<Card className="hover:shadow-md transition-shadow cursor-pointer">
							<CardContent className="p-6">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<div className="p-2 bg-green-100 rounded-lg">
											<Images className="h-6 w-6 text-green-600" />
										</div>
										<div>
											<h3 className="font-semibold text-lg">Image Management</h3>
											<p className="text-sm text-gray-600">Upload and manage S3/CloudFront images</p>
										</div>
									</div>
									<ArrowRight className="h-5 w-5 text-gray-400" />
								</div>
							</CardContent>
						</Card>
					</Link>
				</div>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center space-x-2">
							<Users className="h-5 w-5" />
							<span>Users</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<UsersTable users={users} />
					</CardContent>
				</Card>
			</div>
		</main>
	);
} 
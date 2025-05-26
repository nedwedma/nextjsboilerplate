import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/src/components/ui/table";

interface User {
	id: string;
	email: string | null;
	name: string | null;
	role: string | null;
	emailVerified: boolean | null;
	createdAt: Date;
}

interface UsersTableProps {
	users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
	if (!users || users.length === 0) {
		return <p>No users found.</p>;
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Email Verified</TableHead>
					<TableHead>Created At</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.name || "-"}</TableCell>
						<TableCell>{user.email || "-"}</TableCell>
						<TableCell>{user.role || "user"}</TableCell>
						<TableCell>{user.emailVerified ? "Yes" : "No"}</TableCell>
						<TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
} 
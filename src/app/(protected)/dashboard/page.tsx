import { requireAuth } from "@/src/lib/dal";

const DashboardPage = async () => {
  await requireAuth();

  return <div>Dashboard</div>;
};

export default DashboardPage;

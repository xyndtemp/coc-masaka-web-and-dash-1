import AdminLayout from "../../components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Calendar, Mic, Radio } from "lucide-react";

const DashboardCard = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Members"
          value="150"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Service Attendance"
          value="120"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Sermons"
          value="45"
          icon={<Mic className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardCard
          title="Radio Episodes"
          value="32"
          icon={<Radio className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
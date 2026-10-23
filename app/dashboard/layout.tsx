import Sidebar from "./Sidebar";
import "./sidebar.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">{children}</main>
    </div>
  );
}

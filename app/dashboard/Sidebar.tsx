import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        <Link className="sidebar-link" href="/dashboard/analytics">
          Analytics
        </Link>
        <Link className="sidebar-link" href="/dashboard/teams">
          Teams
        </Link>
        <Link className="sidebar-link" href="/dashboard/reports">
          Reports
        </Link>
        <Link className="sidebar-link" href="/projects">
          Projects
        </Link>
      </ul>
    </aside>
  );
}

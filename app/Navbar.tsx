import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navigaton-header text-2xl font-bold">
      <h1 className="app-title">Project Explorer</h1>
      <nav className="nav-bar">
        <Link className="navbar-link" href="/">
          Home
        </Link>
        <Link className="navbar-link" href="/about">
          About
        </Link>
        <Link className="navbar-link" href="/dashboard">
          Dashboard
        </Link>
        <Link className="navbar-link" href="/projects">
          Projects
        </Link>
        <Link className="navbar-link" href="/settings">
          Settings
        </Link>
      </nav>
    </div>
  );
}

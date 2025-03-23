import { Outlet } from "react-router-dom"

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Pradeep Raj V S. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Layout


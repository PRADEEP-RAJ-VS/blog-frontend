import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Return to Home
      </Link>
    </div>
  )
}

export default NotFoundPage


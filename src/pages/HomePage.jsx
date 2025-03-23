"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { API_URL } from "../config"

function HomePage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts`)
        if (!response.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="text-xl">Loading posts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="text-xl text-destructive">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link to="/posts/new" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-muted-foreground mb-4">No posts yet</h2>
          <Link to="/posts/new" className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <div className="border rounded-lg overflow-hidden h-full flex flex-col hover:border-primary transition-colors">
                <div className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.categories.map((category) => (
                      <span key={category} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
                        {category}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-muted-foreground line-clamp-3">{post.content.substring(0, 150)}...</p>
                </div>
                <div className="px-6 py-4 bg-muted/50 flex items-center justify-between">
                  <span className="text-sm font-medium">{post.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage


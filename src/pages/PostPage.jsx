"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { API_URL } from "../config"

function PostPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Post not found")
          }
          throw new Error("Failed to fetch post")
        }
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return
    }

    setDeleting(true)
    try {
      const response = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      navigate("/")
    } catch (err) {
      setError(err.message)
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="text-xl">Loading post...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-12 text-center">
        <div className="text-xl text-destructive">Error: {error}</div>
        <Link to="/" className="mt-4 inline-block underline">
          Return to home
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="text-sm font-medium hover:underline">
            ← Back to posts
          </Link>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {post.categories.map((category) => (
              <span key={category} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-muted">
                {category}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Link to={`/posts/${post._id}/edit`} className="px-3 py-1.5 text-sm border rounded-md hover:bg-muted">
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-3 py-1.5 text-sm border border-destructive text-destructive rounded-md hover:bg-destructive/10 disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
          <span>By {post.author}</span>
          <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostPage


import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import PostPage from "./pages/PostPage"
import CreatePostPage from "./pages/CreatePostPage"
import EditPostPage from "./pages/EditPostPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="posts/:id" element={<PostPage />} />
        <Route path="posts/new" element={<CreatePostPage />} />
        <Route path="posts/:id/edit" element={<EditPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App


// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./Pages";
import Home from "./Pages/basic/Home";
import Login from "./Pages/basic/Login";
import Register from "./Pages/basic/Register";
import Posts from "./Pages/post/Posts";
import CreatePost from "./Pages/post/CreatePost";
import PostDetail from "./Pages/post/PostDetail";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Route>
    </Routes>
  );
};

export default App;

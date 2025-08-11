import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostCard from "../../components/PostCard";

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async ({
  pageParam = 1,
}): Promise<{ posts: Post[]; nextPage: number | null }> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=20`
  );
  if (!response.ok) throw new Error("Failed to fetch posts");
  const posts = await response.json();
  return { posts, nextPage: posts.length === 20 ? pageParam + 1 : null };
};

const Posts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  const postsPerScreen = Math.floor(window.innerHeight / 150);
  const initialPosts = Math.max(6, Math.min(postsPerScreen, 12));

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (lastPostRef.current) {
      observerRef.current.observe(lastPostRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  // Filter posts based on search query
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen min-w-screen space-y-8 bg-black/20 backdrop-blur-md p-8">
      <div className="relative">
        <h1 className="text-4xl font-extrabold text-center text-white md:text-5xl">
          Posts
        </h1>
        <div className="max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts by title or content..."
            className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      {isLoading && (
        <p className="text-center text-lg text-gray-200">Loading posts...</p>
      )}
      {error && (
        <p className="text-center text-lg text-red-400">
          Error: {(error as Error).message}
        </p>
      )}
      {filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-8xl pl-8 pr-8 mx-auto">
          {filteredPosts
            .slice(0, isLoading ? initialPosts : filteredPosts.length)
            .map((post, index) => (
              <div
                key={post.id}
                ref={index === filteredPosts.length - 1 ? lastPostRef : null}
              >
                <PostCard id={post.id} title={post.title} body={post.body} />
              </div>
            ))}
        </div>
      )}
      {filteredPosts.length === 0 && !isLoading && (
        <p className="text-center text-lg text-gray-200">
          No posts match your search.
        </p>
      )}
      {isFetchingNextPage && (
        <p className="text-center text-lg text-gray-200 mt-4">
          Loading more posts...
        </p>
      )}
      {hasNextPage && !isFetchingNextPage && filteredPosts.length > 0 && (
        <p className="text-center text-lg text-gray-200 mt-4">
          Scroll down to load more posts
        </p>
      )}
      {!hasNextPage && filteredPosts.length > 0 && (
        <p className="text-center text-lg text-gray-200 mt-4">
          No more posts to load
        </p>
      )}
    </div>
  );
};

export default Posts;

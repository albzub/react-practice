import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPost = async (id: string): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id!),
  });

  // Mock comment data (skeleton for UI)
  const mockComments = [
    { id: 1, author: 'User 1', body: 'This is a great post!' },
    { id: 2, author: 'User 2', body: 'Thanks for sharing!' },
    { id: 3, author: 'User 3', body: 'Really insightful content.' },
  ];

  return (
    <div className="min-h-screen min-w-screen max-w-3xl w-full space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
      <h1 className="text-4xl font-extrabold text-center text-white md:text-5xl">
        Post Details
      </h1>
      {isLoading && (
        <p className="text-center text-lg text-gray-200">Loading post...</p>
      )}
      {error && (
        <p className="text-center text-lg text-red-400">
          Error: {(error as Error).message}
        </p>
      )}
      {post && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
          <p className="text-gray-200">{post.body}</p>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white">Comments</h3>
        <div className="mt-4 space-y-4">
          {mockComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white/20 p-4 rounded-md shadow-md ml-4 border-l-4 border-indigo-400"
            >
              <p className="text-sm font-medium text-gray-200">{comment.author}</p>
              <p className="text-gray-300">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
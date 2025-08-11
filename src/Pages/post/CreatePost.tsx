import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(10, 'Content must be at least 10 characters'),
});

type PostFormInputs = z.infer<typeof postSchema>;

const createPost = async (post: PostFormInputs): Promise<void> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });
  if (!response.ok) throw new Error('Failed to create post');
};

const CreatePost: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<PostFormInputs>({
    resolver: zodResolver(postSchema),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/posts');
    },
    onError: () => {
      toast.error('Failed to create post', {
        position: 'top-right',
        autoClose: 3000,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="min-h-screen min-w-screen max-w-lg w-full space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20">
      <h1 className="text-4xl font-extrabold text-center text-white md:text-5xl">
        Create Post
      </h1>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-200">
              Title
            </label>
            <input
              id="title"
              type="text"
              className={`mt-1 block w-full px-4 py-3 bg-white/5 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                errors.title
                  ? 'border-red-400 focus:ring-red-400'
                  : touchedFields.title
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-gray-300/50 focus:ring-indigo-400 focus:border-indigo-400'
              }`}
              placeholder="Post title"
              {...register('title')}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-200">
              Content
            </label>
            <textarea
              id="body"
              className={`mt-1 block w-full px-4 py-3 bg-white/5 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
                errors.body
                  ? 'border-red-400 focus:ring-red-400'
                  : touchedFields.body
                  ? 'border-green-400 focus:ring-green-400'
                  : 'border-gray-300/50 focus:ring-indigo-400 focus:border-indigo-400'
              }`}
              placeholder="Write your post content..."
              rows={5}
              {...register('body')}
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-400">{errors.body.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 transition-transform duration-200 ${
            mutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
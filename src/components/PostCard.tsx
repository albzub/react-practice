import React from "react";
import { Link } from 'react-router-dom';

interface CardProps {
  id: number;
  title?: string;
  body?: string;
}

const PostCard: React.FC<CardProps> = ({ id, title, body }) => {
  return (
    <Link
      to={`/posts/${id}`}
      className="block bg-white/50 p-6 rounded-lg shadow-md hover:bg-white/25 hover:shadow-lg transition-all duration-300 min-h-[150px] flex flex-col"
    > 
      <h2 className="text-3xl font-semibold text-accent truncate">
        {title || 'Untitled'}
      </h2>
      <p className="mt-2 text-gray-100 line-clamp-3 flex-grow">
        {body || 'No content available'}
      </p>
    </Link>
  );
};

export default PostCard;
import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="relative group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                        {title.length > 60 ? title.slice(0, 60) + '...' : title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;

import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    // Skeleton loading UI
    const renderLoadingSkeletons = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, index) => (
                <div
                    key={index}
                    className="h-64 bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 rounded-xl shadow-sm"
                ></div>
            ))}
        </div>
    );

    // Empty state
    const renderEmptyState = () => (
        <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">No Posts Found</h1>
            <p className="text-gray-600 text-lg">Please log in or create a post to get started.</p>
        </div>
    );

    return (
        <div className="w-full py-10 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <Container>
                <h1 className="text-5xl font-extrabold text-center text-purple-800 mb-12 tracking-tight">
                    Explore Latest Posts
                </h1>

                {loading ? (
                    renderLoadingSkeletons()
                ) : posts.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="transform transition-transform duration-300 hover:scale-105"
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;

import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    appwriteService.getPosts([]).then((response) => {
      if (response) {
        setPosts(response.documents);
      }
      setLoading(false);
    });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full py-10 bg-gray-50 min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Explore All Posts
        </h1>

       
        <div className="max-w-xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search posts by title..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

  
        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts found.</p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;

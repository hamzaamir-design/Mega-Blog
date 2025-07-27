import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Postform, Button } from '../components';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function AddPost() {
  const navigate = useNavigate();

  const handlePostSuccess = () => {
    toast.success('🎉 Post created successfully!');
    setTimeout(() => navigate('/all-posts'), 3000);
  };

  const handleCancel = () => {
    navigate('/all-posts');
  };

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create a New Post</h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-lg rounded-xl p-6 max-w-3xl mx-auto"
        >
          <Postform onSuccess={handlePostSuccess} />

          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={handleCancel} bgColor="bg-red-500">
              Cancel
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AddPost;

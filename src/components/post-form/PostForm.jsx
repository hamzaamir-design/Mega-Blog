import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Postform({ post, onSuccess }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const slugTransform = useCallback((value) => {
    return value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') || '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const submit = async (data) => {
    try {
      let featuredImageId = post?.featuredImage || null;

      if (data.image?.[0]) {
        const uploadedFile = await appwriteService.uploadFile(data.image[0]);
        if (uploadedFile) {
          if (post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }
          featuredImageId = uploadedFile.$id;
        }
      }

      const payload = {
        ...data,
        featuredImage: featuredImageId,
        userId: userData?.$id,
      };

      const response = post
        ? await appwriteService.updatePost(post.$id, payload)
        : await appwriteService.createPost(payload);

      if (response) {
        onSuccess?.();
        navigate(`/post/${response.$id}`);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              {...register('title', { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Slug</label>
            <input
              type="text"
              placeholder="Auto-generated slug"
              {...register('slug', { required: true })}
              onChange={(e) =>
                setValue('slug', slugTransform(e.target.value), {
                  shouldValidate: true,
                })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Content</label>
            <RTE
              name="content"
              control={control}
              defaultValue={getValues('content')}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('image', { required: !post })}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {post?.featuredImage && (
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt="Current"
                className="mt-3 rounded-lg border border-gray-200 shadow-sm"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              {...register('status', { required: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <Button
            type="submit"
            bgColor={post ? 'bg-green-500' : 'bg-blue-600'}
            className="w-full"
          >
            {post ? 'Update' : 'Submit'}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Postform;

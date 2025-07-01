import { motion } from 'framer-motion';

const Loading = ({ type = 'grid' }) => {
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-200 shimmer"></div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-16 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
        </div>
      </div>
    </div>
  );
  
  const SkeletonListItem = () => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-80 h-48 sm:h-40 bg-gray-200 shimmer"></div>
        <div className="flex-1 p-6 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3 shimmer"></div>
          <div className="h-5 bg-gray-200 rounded w-2/3 shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 shimmer"></div>
          <div className="flex space-x-6">
            <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-20 shimmer"></div>
            <div className="h-4 bg-gray-200 rounded w-24 shimmer"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
        </div>
      </div>
    </div>
  );
  
  if (type === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </motion.div>
    );
  }
  
  if (type === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {[...Array(4)].map((_, index) => (
          <SkeletonListItem key={index} />
        ))}
      </motion.div>
    );
  }
  
  if (type === 'detail') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse"
      >
        <div className="h-96 bg-gray-200 rounded-lg mb-8 shimmer"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4 shimmer"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 shimmer"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 shimmer"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg shimmer"></div>
            <div className="h-24 bg-gray-200 rounded-lg shimmer"></div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;
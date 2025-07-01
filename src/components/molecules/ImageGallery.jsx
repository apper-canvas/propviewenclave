import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ImageGallery = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const openFullscreen = () => {
    setIsFullscreen(true);
  };
  
  const closeFullscreen = () => {
    setIsFullscreen(false);
  };
  
  return (
    <>
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={openFullscreen}
          />
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ApperIcon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ApperIcon name="ChevronRight" size={20} />
            </button>
          </>
        )}
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        
        <button
          onClick={openFullscreen}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ApperIcon name="Maximize" size={16} />
        </button>
      </div>
      
      {images.length > 1 && (
        <div className="flex space-x-2 mt-4 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentIndex ? 'border-primary' : 'border-gray-200'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={closeFullscreen}
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition-colors z-10"
            >
              <ApperIcon name="X" size={24} />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                  >
                    <ApperIcon name="ChevronLeft" size={24} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
                  >
                    <ApperIcon name="ChevronRight" size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
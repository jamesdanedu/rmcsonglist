import React, { useRef, useState } from 'react';
import { Check, X, Mic } from 'lucide-react';
import Button from './ui/Button';

/**
 * Song Card component with swipe functionality
 */
const SongCard = ({ song, onVote, onSkip }) => {
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);
  const touchStartX = useRef(0);

  // Handle start of touch
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch movement
  const handleTouchMove = (e) => {
    if (!cardRef.current) return;
    
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX.current;
    
    // Calculate how much to rotate and move the card
    const rotate = diff / 10;
    const translateX = diff;
    
    // Apply transform to the card
    cardRef.current.style.transform = `translateX(${translateX}px) rotate(${rotate}deg)`;
    
    // Determine swipe direction for visual feedback
    if (diff > 50) {
      setSwipeDirection('right');
    } else if (diff < -50) {
      setSwipeDirection('left');
    } else {
      setSwipeDirection(null);
    }
  };

  // Handle end of touch
  const handleTouchEnd = () => {
    if (!cardRef.current) return;
    
    // Reset card position animation
    cardRef.current.style.transition = 'transform 0.5s ease';
    
    // Check if the swipe was decisive enough
    if (swipeDirection === 'right') {
      // Vote yes
      cardRef.current.style.transform = 'translateX(1000px) rotate(30deg)';
      setTimeout(() => {
        onVote(song.id);
      }, 300);
    } else if (swipeDirection === 'left') {
      // Skip/No vote
      cardRef.current.style.transform = 'translateX(-1000px) rotate(-30deg)';
      setTimeout(() => {
        onSkip();
      }, 300);
    } else {
      // Not enough movement, reset position
      cardRef.current.style.transform = 'translateX(0) rotate(0)';
    }
    
    setSwipeDirection(null);
  };

  // Handle button votes (alternative to swiping)
  const handleVoteButton = () => {
    setSwipeDirection('right');
    handleTouchEnd();
  };

  const handleSkipButton = () => {
    setSwipeDirection('left');
    handleTouchEnd();
  };

  return (
    <div className="relative h-full">
      <div
        ref={cardRef}
        className={`absolute inset-0 bg-white rounded-xl shadow-lg overflow-hidden transition-transform ${
          swipeDirection === 'right' 
            ? 'border-2 border-green-400' 
            : swipeDirection === 'left' 
              ? 'border-2 border-red-400' 
              : 'border border-indigo-200'
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-48 bg-gray-100 relative">
          <iframe 
            src={song.youtubeUrl} 
            className="w-full h-full" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            title={song.title}
          ></iframe>
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-lg text-indigo-700">{song.title}</h3>
          <p className="text-indigo-600">{song.artist}</p>
          
          {song.notes && (
            <p className="text-gray-600 mt-2 text-sm border-t border-indigo-100 pt-2">
              {song.notes}
            </p>
          )}
          
          <p className="text-xs text-gray-400 mt-4 flex items-center">
            <Mic size={12} className="mr-1 text-indigo-400" />
            Suggested by: {song.suggestedBy}
          </p>
        </div>
        
        {/* Swipe Overlays */}
        {swipeDirection === 'right' && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-md">
            YES! <Check size={14} className="inline ml-1" />
          </div>
        )}
        
        {swipeDirection === 'left' && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-12 shadow-md">
            SKIP <X size={14} className="inline ml-1" />
          </div>
        )}
      </div>
      
      {/* Button Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <Button.Icon
          onClick={handleSkipButton}
          className="mx-4 text-red-500 hover:bg-red-50 hover:border-red-200"
          icon={<X size={28} />}
        />
        
        <Button.Icon
          onClick={handleVoteButton}
          className="mx-4 text-green-500 hover:bg-green-50 hover:border-green-200"
          icon={<Check size={28} />}
        />
      </div>
    </div>
  );
};

export default SongCard;
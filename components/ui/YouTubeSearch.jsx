import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { searchYouTubeVideos } from '../lib/youtube-api';
import Button from './ui/Button';

/**
 * Component for searching and selecting YouTube videos
 */
const YouTubeSearch = ({ songTitle, songArtist, onSelectVideo }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  // Handle YouTube search
  const handleSearch = async () => {
    if (!songTitle || !songArtist) {
      setError('Please enter both song title and artist before searching');
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const query = `${songTitle} ${songArtist}`;
      const results = await searchYouTubeVideos(query);
      setSearchResults(results);
    } catch (err) {
      console.error('YouTube search error:', err);
      setError('Failed to search YouTube. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
      <div className="flex items-center mb-2">
        <Button
          onClick={handleSearch}
          disabled={isSearching || !songTitle || !songArtist}
          variant="danger"
          icon={<Search size={16} />}
        >
          {isSearching ? 'Searching...' : 'Find on YouTube'}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Search size={16} className="mr-1 text-indigo-500" />
            Select a video:
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto rounded-lg border border-indigo-100">
            {searchResults.map(video => (
              <div
                key={video.id}
                className="flex items-center p-3 hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
                onClick={() => onSelectVideo(video)}
              >
                <div className="relative rounded-md overflow-hidden w-24 h-16 bg-gray-100 flex-shrink-0">
                  <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 hover:bg-opacity-10 transition-all duration-150">
                    <div className="w-8 h-8 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                      <ArrowRight size={16} className="text-red-600 ml-0.5" />
                    </div>
                  </div>
                </div>
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium truncate">{video.title}</p>
                  <p className="text-xs text-gray-500 truncate">{video.channelTitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeSearch;
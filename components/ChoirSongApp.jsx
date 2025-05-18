'use client';

import React, { useState } from 'react';
import { X, Check, Heart, BarChart3, PlusCircle, Music, Mic, ArrowRight, ListMusic, Users, Star } from 'lucide-react';

/**
 * Custom Choir Icon component
 */
const ChoirIcon = ({ size = 28, className = '' }) => {
  // Scale the music note size relative to the main icon size
  const musicSize = Math.max(Math.floor(size * 0.4), 12);
  
  return (
    <div className={`relative inline-block ${className}`}>
      <Users size={size} className="text-indigo-600" />
      <div className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-1 shadow-md">
        <Music size={musicSize} className="text-indigo-600" />
      </div>
    </div>
  );
};

/**
 * Enhanced version of the ChoirSongApp component
 */
const ChoirSongApp = () => {
  // Local state for testing
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [activeTab, setActiveTab] = useState('suggest');
  const [songs, setSongs] = useState([]);
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    notes: ''
  });
  
  // Mock login
  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };
  
  // Mock add song
  const handleAddSong = () => {
    if (newSong.title && newSong.artist) {
      const songToAdd = {
        id: Date.now(),
        title: newSong.title,
        artist: newSong.artist,
        notes: newSong.notes,
        suggestedBy: username,
        votes: 0,
        voters: []
      };
      setSongs([...songs, songToAdd]);
      setNewSong({ title: '', artist: '', notes: '' });
    }
  };

  // Handle voting
  const handleVote = (songId) => {
    setSongs(songs.map(song => 
      song.id === songId 
        ? { ...song, votes: song.votes + 1, voters: [...song.voters, username] }
        : song
    ));
  };
  
  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 p-4 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-indigo-100">
          <div className="text-center mb-6">
            <ChoirIcon size={48} />
            <h1 className="text-2xl font-bold text-indigo-700 mb-1 mt-2">RMC Song Wishlist</h1>
            <p className="text-indigo-400 text-sm">Share, vote, and discover new songs</p>
          </div>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Mic size={16} className="mr-1 text-indigo-500" />
              Your Name
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          
          <button
            onClick={handleLogin}
            disabled={!username.trim()}
            className={`w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center ${
              !username.trim() 
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 shadow-sm'
            }`}
          >
            <ArrowRight size={18} className="mr-1" />
            <span>Enter App</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="mb-6 text-center bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-center mb-2">
            <ChoirIcon size={28} />
            <h1 className="text-2xl font-bold text-indigo-700 ml-2">RMC Song Wishlist</h1>
          </div>
          <p className="text-indigo-600 flex items-center justify-center">
            <Mic size={16} className="mr-1" />
            <span>Logged in as: {username}</span>
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            className={`flex-1 py-2 px-4 flex items-center justify-center ${
              activeTab === 'suggest' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('suggest')}
          >
            <PlusCircle size={18} className="mr-1" />
            <span>Suggest</span>
          </button>
          <button
            className={`flex-1 py-2 px-4 flex items-center justify-center ${
              activeTab === 'vote' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('vote')}
          >
            <Heart size={18} className="mr-1" />
            <span>Vote</span>
          </button>
          <button
            className={`flex-1 py-2 px-4 flex items-center justify-center ${
              activeTab === 'rank' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            } transition-colors duration-200`}
            onClick={() => setActiveTab('rank')}
          >
            <BarChart3 size={18} className="mr-1" />
            <span>Rankings</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'suggest' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-indigo-700">
              <PlusCircle size={20} className="mr-2 text-indigo-500" />
              Suggest a New Song
            </h2>
            
            <div className="mb-4">
              <label htmlFor="songTitle" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Music size={16} className="mr-1 text-indigo-500" />
                Song Title
              </label>
              <input
                type="text"
                id="songTitle"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200"
                value={newSong.title}
                onChange={(e) => setNewSong({...newSong, title: e.target.value})}
                placeholder="Enter song title"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="artist" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Mic size={16} className="mr-1 text-indigo-500" />
                Artist/Composer
              </label>
              <input
                type="text"
                id="artist"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200"
                value={newSong.artist}
                onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
                placeholder="Enter artist or composer"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <ListMusic size={16} className="mr-1 text-indigo-500" />
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all duration-200"
                value={newSong.notes}
                onChange={(e) => setNewSong({...newSong, notes: e.target.value})}
                placeholder="Any additional information"
                rows="3"
              />
            </div>
            
            <button
              onClick={handleAddSong}
              disabled={!newSong.title || !newSong.artist}
              className={`w-full py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center ${
                (!newSong.title || !newSong.artist) 
                  ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 shadow-sm'
              }`}
            >
              <PlusCircle size={18} className="mr-1" />
              <span>Submit Song</span>
            </button>
          </div>
        )}
        
        {activeTab === 'vote' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-indigo-700">
              <Heart size={20} className="mr-2 text-pink-500" />
              Vote for Songs
            </h2>
            
            {songs.length === 0 ? (
              <div className="text-center py-10 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                <Music size={48} className="mx-auto text-indigo-300 mb-3" />
                <p className="text-indigo-600 font-medium">No songs have been suggested yet.</p>
                <p className="text-indigo-400 text-sm mt-1">Be the first to suggest a song!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {songs.map(song => {
                  const hasVoted = song.voters.includes(username);
                  
                  return (
                    <div 
                      key={song.id} 
                      className="border border-indigo-100 rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-indigo-700">{song.title}</h3>
                            <p className="text-sm text-indigo-600">{song.artist}</p>
                            {song.notes && (
                              <p className="text-sm text-gray-600 mt-1 border-t border-indigo-100 pt-1">{song.notes}</p>
                            )}
                            <p className="text-xs text-indigo-400 mt-2 flex items-center">
                              <Mic size={12} className="mr-1" />
                              Suggested by: {song.suggestedBy}
                            </p>
                          </div>
                          <div className="flex flex-col items-center ml-4">
                            <div className="bg-white text-indigo-700 rounded-full h-8 w-8 flex items-center justify-center font-bold shadow-sm">
                              {song.votes}
                            </div>
                            <button 
                              className={`mt-2 rounded-md px-4 py-1 text-sm flex items-center ${
                                hasVoted
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-sm'
                              }`}
                              onClick={() => handleVote(song.id)}
                              disabled={hasVoted}
                            >
                              <Heart size={14} className="mr-1" />
                              {hasVoted ? 'Voted' : 'Vote'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'rank' && (
          <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-indigo-700">
              <BarChart3 size={20} className="mr-2 text-indigo-500" />
              Song Rankings
            </h2>
            
            {songs.length === 0 ? (
              <div className="text-center py-10 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                <ListMusic size={48} className="mx-auto text-indigo-300 mb-3" />
                <p className="text-indigo-600 font-medium">No songs have been suggested yet.</p>
                <p className="text-indigo-400 text-sm mt-1">Go to the Suggest tab to add a song!</p>
              </div>
            ) : (
              <div>
                <div className="p-4 mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                  {[...songs]
                    .sort((a, b) => b.votes - a.votes)
                    .map((song, index) => (
                      <div key={song.id} className="mb-3">
                        <div className="flex items-center">
                          <div className="font-bold w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm mr-2 shadow-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div 
                              className="h-10 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-lg relative overflow-hidden shadow-sm transition-all duration-300 hover:translate-x-1" 
                              style={{ width: `${Math.max((song.votes / Math.max(...songs.map(s => s.votes), 1)) * 100, 10)}%` }}
                            >
                              <div className="absolute inset-0 flex items-center px-3">
                                <span className="text-white font-medium truncate">{song.title}</span>
                                <div className="ml-auto bg-white text-indigo-700 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shadow-sm">
                                  {song.votes}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
                  <h3 className="text-sm font-semibold mb-3 text-indigo-700 flex items-center">
                    <ListMusic size={16} className="mr-1" />
                    Detailed List
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                    {[...songs]
                      .sort((a, b) => b.votes - a.votes)
                      .map((song, index) => (
                        <div 
                          key={song.id} 
                          className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <div className="font-bold w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm mr-3 flex-shrink-0">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-indigo-700">
                                  {song.title}
                                </h4>
                                <p className="text-sm text-indigo-600">{song.artist}</p>
                                <p className="text-xs text-indigo-400 mt-1 flex items-center">
                                  <Mic size={12} className="mr-1" />
                                  Suggested by: {song.suggestedBy}
                                </p>
                              </div>
                            </div>
                            <div className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-sm">
                              <Star size={14} className="mr-1 text-yellow-500" />
                              {song.votes} {song.votes === 1 ? 'vote' : 'votes'}
                            </div>
                          </div>
                          
                          {song.notes && (
                            <div className="mt-3 text-sm text-gray-600 border-t border-indigo-100 pt-2">
                              {song.notes}
                            </div>
                          )}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChoirSongApp;
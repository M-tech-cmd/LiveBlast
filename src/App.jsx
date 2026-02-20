import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ZegoRoom from './components/ZegoRoom';

const App = () => {
  const [status, setStatus] = useState('Initializing');
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 px-2 sm:px-4 py-3 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 sm:mb-4 px-2">
            Live Streaming
          </h2>

          {/* Status */}
          <div className="mb-4 sm:mb-6 p-2 sm:p-3 bg-white rounded-lg shadow-sm flex items-center mx-2">
            <span className="text-sm sm:text-base text-gray-700 mr-2 font-medium">
              Status:
            </span>
            <span
              className={`text-sm sm:text-base font-semibold ${
                status === 'Joined'
                  ? 'text-green-600'
                  : status.includes('Error') || status.includes('Failed')
                  ? 'text-red-600'
                  : 'text-blue-600'
              }`}
            >
              {status}
            </span>
            {!isJoined && !status.includes('Error') && (
              <svg
                className="animate-spin h-4 w-4 text-blue-600 ml-2 sm:ml-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            )}
          </div>

          {/* Video Container - NO DARK BACKGROUND */}
          <div className="w-full mx-auto">
            <div 
              className="relative w-full bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-lg"
              style={{
                aspectRatio: '6 / 9',
                minHeight: '600px',
                maxHeight: '85vh'
              }}
            >
              {/* Loading Overlay */}
              {!isJoined && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 z-10">
                  <div className="text-center px-4">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎥</div>
                    <p className="text-sm sm:text-base text-gray-600">
                      {status.includes('Error')
                        ? 'Failed to load'
                        : 'Preparing your video call...'}
                    </p>
                  </div>
                </div>
              )}

              {/* ZEGO Room Component */}
              <ZegoRoom
                onStatusChange={setStatus}
                onJoined={setIsJoined}
              />
            </div>
          </div>
        </div>
      </main>

    
    </div>
  );
};

export default App;
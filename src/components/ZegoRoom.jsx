import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function getUrlParams(url) {
  try {
    const parsed = new URL(url);
    return Object.fromEntries(parsed.searchParams.entries());
  } catch (error) {
    const urlStr = '' + url.split('?')[1] || '';
    return Object.fromEntries(new URLSearchParams(urlStr).entries());
  }
}

const ZegoRoom = ({ onStatusChange, onJoined }) => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const initializeZego = async () => {
      try {
        console.log('🚀 Starting ZEGO initialization...');

        const rawAppID = import.meta.env.VITE_APP_ID;
        const rawServerSecret = import.meta.env.VITE_SERVER_SECRET;

        const appID = rawAppID ? Number(rawAppID) : NaN;
        if (isNaN(appID) || !isFinite(appID)) {
          onStatusChange?.('Missing App ID');
          return;
        }

        if (!rawServerSecret) {
          onStatusChange?.('Missing Server Secret');
          return;
        }

        console.log('✅ Credentials validated');

        const params = getUrlParams(window.location.href);
        const roomID = params.roomID || String(Math.floor(Math.random() * 10000));
        const userID = params.userID || String(Math.floor(Math.random() * 10000));
        const userName = params.username || `user_${userID}`;
        const roleParam = params.role || 'host';
        const role = roleParam === 'host' ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

        console.log('📝 Room Details:', { roomID, userID, userName, role: roleParam });

        onStatusChange?.('Generating Kit Token');
        console.log('🔑 Generating token...');
        
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          rawServerSecret,
          roomID,
          userID,
          userName
        );
        console.log('✅ Token generated successfully');

        onStatusChange?.('Creating Instance');
        console.log('🔨 Creating ZEGO instance...');
        
        const zpInstance = ZegoUIKitPrebuilt.create(kitToken);
        instanceRef.current = zpInstance;
        console.log('✅ Instance created');

        const hostConfig = {
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          layout: 'Auto',
          showRoomTimer: true,
          // Mobile optimizations
          videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P,
        };

        const joinOpts = {
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
            config: { role },
          },
          sharedLinks: [{
            name: 'Join as an Audience',
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${encodeURIComponent(roomID)}&role=audience`,
          }],
          ...(role === ZegoUIKitPrebuilt.Host ? hostConfig : {}),
        };

        onStatusChange?.('Joining Room');
        console.log('🚪 Joining room...');
        
        await zpInstance.joinRoom(joinOpts);
        
        onStatusChange?.('Joined');
        onJoined?.(true);
        console.log('✅🎉 Successfully joined the room!');

      } catch (err) {
        console.error('❌ Initialization error:', err);
        onStatusChange?.(`Error: ${err.message}`);
      }
    };

    const timer = setTimeout(initializeZego, 100);

    return () => {
      clearTimeout(timer);
      if (instanceRef.current) {
        console.log('🧹 Cleaning up ZEGO instance');
        try {
          instanceRef.current.destroy();
        } catch (e) {
          console.warn('Cleanup warning:', e);
        }
      }
    };
  }, [onStatusChange, onJoined]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default ZegoRoom;
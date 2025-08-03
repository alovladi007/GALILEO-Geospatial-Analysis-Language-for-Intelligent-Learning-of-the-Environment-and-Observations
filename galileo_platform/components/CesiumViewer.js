import { useEffect } from 'react';

// Cesium imports must be dynamic to avoid SSR issues
let Viewer = null;
let Ion = null;

if (typeof window !== 'undefined') {
  const resium = require('resium');
  const cesium = require('cesium');
  Viewer = resium.Viewer;
  Ion = cesium.Ion;
  Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || '';
}

export default function CesiumViewer() {
  useEffect(() => {
    // Cesium asset path fix when served via Next.js static
    // eslint-disable-next-line no-undef
    if (typeof window !== 'undefined' && window.CESIUM_BASE_URL === undefined) {
      // point to Cesium assets within node modules
      // this is required when using vite/next, etc.
      window.CESIUM_BASE_URL = '/Cesium';
    }
  }, []);

  if (!Viewer) {
    return <div className="w-full h-[600px] bg-gray-800 flex items-center justify-center text-gray-400">
      Loading 3D Globe...
    </div>;
  }
  
  return <Viewer full />;
}
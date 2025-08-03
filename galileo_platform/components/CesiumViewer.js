import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Viewer = dynamic(() => import('resium').then(mod => mod.Viewer), { ssr: false });
import { Ion } from 'cesium';

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN || '';

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

  return <Viewer full />;
}
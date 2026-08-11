'use client';
import { useEffect } from 'react';

interface PushPayWindow extends Window {
  pushpayEmbeddedFallbackDone?: boolean;
  pushpayEmbeddedConfig?: { handle: string; wgc: string };
}

export default function PushPayEmbed() {
  useEffect(() => {
    const win = window as PushPayWindow;
    if (win.pushpayEmbeddedFallbackDone) return;

    win.pushpayEmbeddedConfig = {
      handle: 'solabiblechurchtx',
      wgc: 'eyJhc2tncCI6dHJ1ZX06S3J6cmN5QmF0N2VnMm9veElaeTVMMktYNGZF',
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://embedded.pushpay.com?version=1.0.0';
    document.head.appendChild(script);
  }, []);

  return <div id="pushpay-embedded-giving-fallback" />;
}

'use client';
import { useEffect } from 'react';

export default function PushPayEmbed() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
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

"use client";

import Script from "next/script";
import { useConsentChoice } from "@/lib/consent";

const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/**
 * Loads the client-owned GA4 and Meta tags only when their IDs are configured
 * AND the visitor has accepted analytics via the cookie banner. When consent
 * is declined (or undecided), no third-party tags load; the typed event layer
 * in src/lib/analytics.ts safely no-ops without them.
 */
export default function Analytics() {
  const consent = useConsentChoice();

  if (consent !== "accepted") return null;

  return (
    <>
      {ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4Id}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}

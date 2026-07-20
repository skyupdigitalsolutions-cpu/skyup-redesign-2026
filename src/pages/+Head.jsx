// pages/+Head.jsx
import { usePageContext } from "vike-react/usePageContext";

export default function Head() {
  const { config } = usePageContext();
  const description = config?.metaDescription || "";

  return (
    <>
      {description && <meta name="description" content={description} />}
      {config?.keywords && <meta name="keywords" content={config.keywords} />}

      {/* Poppins + Geist are self-hosted (@fontsource, bundled). Only Cormorant Garamond
          is fetched from Google, and it's loaded non-render-blocking (media=print, flipped
          to all after load) so it never blocks first paint. Same fonts, same look. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        media="print"
        data-font="cormorant"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap"
      />
      <noscript>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap"
        />
      </noscript>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "requestAnimationFrame(function(){var l=document.querySelector('link[data-font=cormorant]');if(l)l.media='all';});",
        }}
      />

      {/* Icons — point at the file that actually exists in /public */}
      <link rel="icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#0037CA" />
      <meta name="robots" content="index, follow" />

      {/* GTM deferred — loads after the page is interactive */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.addEventListener('load', function() {
            setTimeout(function() {
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-P9ZNGSFR');
            }, 2500);
          });
        `,
        }}
      />
    </>
  );
}
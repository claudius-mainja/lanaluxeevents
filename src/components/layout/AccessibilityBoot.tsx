/**
 * Applies stored accessibility preferences (text size, reduced motion)
 * before first paint so there is no flash of unstyled preference.
 */
export default function AccessibilityBoot() {
  const script = `(function(){try{var raw=localStorage.getItem('lle:a11y');if(!raw)return;var s=JSON.parse(raw);var d=document.documentElement;if(s&&s.textSize&&s.textSize!=='default'){d.setAttribute('data-text-size',s.textSize);}if(s&&s.motion==='reduced'){d.setAttribute('data-motion','reduced');}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

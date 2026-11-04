const C='dq11-f2ad621d';
const A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png','favicon-48.png','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET')return;
  if(new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>{
    const n=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));}return res;}).catch(()=>m);
    return m||n;
  }));
});

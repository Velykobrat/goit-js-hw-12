import{a as m,S as g}from"./assets/vendor-2591be5d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();async function l(o,s=1,n=15){const e=`https://pixabay.com/api/?key=43059810-21766dfeafea29ca9c24ae0e2&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&page=${s}&per_page=${n}`;try{return(await m.get(e)).data.hits}catch(t){return console.error("Error fetching data:",t),[]}}function d(o){const s=document.getElementById("gallery");o.forEach(r=>{const e=`
      <div class="card">
        <a href="${r.largeImageURL}" data-lightbox="image">
          <img src="${r.webformatURL}" alt="${r.tags}">
        </a>
        <div class="info">
          <p><strong>Likes</strong> <br>${r.likes}</p>
          <p><strong>Views</strong> <br>${r.views}</p>
          <p><strong>Comments</strong> <br>${r.comments}</p>
          <p><strong>Downloads</strong> <br>${r.downloads}</p>
        </div>
      </div>
    `;s.insertAdjacentHTML("beforeend",e)}),new g("#gallery a",{}).refresh()}const p=document.getElementById("search-form"),a=document.getElementById("loader"),u=document.getElementById("load-more-btn");let f="",i=1;p.addEventListener("submit",async o=>{o.preventDefault();const n=document.getElementById("search-input").value.trim();if(!n){iziToast.error({title:"Error",message:"Please enter a search query!"});return}f=n,i=1,a.classList.remove("hidden");try{const r=await l(n);d(r),u.style.display="block"}catch(r){console.error("Error searching for images:",r)}finally{a.classList.add("hidden")}});u.addEventListener("click",async()=>{a.classList.remove("hidden");try{const o=await l(f,i+1);d(o),i++}catch(o){console.error("Error loading more images:",o)}finally{a.classList.add("hidden")}});
//# sourceMappingURL=commonHelpers.js.map

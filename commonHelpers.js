import{a as f,S as g}from"./assets/vendor-2591be5d.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();async function l(r,n=1,o=15){const e=`https://pixabay.com/api/?key=43059810-21766dfeafea29ca9c24ae0e2&q=${r}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${o}`;try{return(await f.get(e)).data.hits}catch(t){return console.error("Error fetching data:",t),[]}}function d(r,n){const o=document.getElementById("gallery");r.forEach(e=>{const t=`
      <div class="card">
        <a href="${e.largeImageURL}" data-lightbox="image">
          <img src="${e.webformatURL}" alt="${e.tags}">
        </a>
        <div class="info">
          <p><strong>Likes</strong> <br>${e.likes}</p>
          <p><strong>Views</strong> <br>${e.views}</p>
          <p><strong>Comments</strong> <br>${e.comments}</p>
          <p><strong>Downloads</strong> <br>${e.downloads}</p>
        </div>
      </div>
    `;o.insertAdjacentHTML("beforeend",t)}),new g("#gallery a",{}).refresh(),o.children.length>=n&&(p(),y())}function p(){const r=document.getElementById("load-more-btn");r.style.display="none"}function y(){const r=document.getElementById("end-message");r.style.display="block"}const h=document.getElementById("search-form"),a=document.getElementById("loader"),u=document.getElementById("load-more-btn");let m="",i=1;h.addEventListener("submit",async r=>{r.preventDefault();const o=document.getElementById("search-input").value.trim();if(!o){iziToast.error({title:"Error",message:"Please enter a search query!"});return}m=o,i=1,a.classList.remove("hidden");try{const s=await l(o),e=s.totalHits;d(s,e),u.style.display="block"}catch(s){console.error("Error searching for images:",s)}finally{a.classList.add("hidden")}});u.addEventListener("click",async()=>{a.classList.remove("hidden");try{const r=await l(m,i+1);d(r),i++}catch(r){console.error("Error loading more images:",r)}finally{a.classList.add("hidden")}});
//# sourceMappingURL=commonHelpers.js.map

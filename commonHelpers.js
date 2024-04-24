import{a as f,S as h}from"./assets/vendor-2591be5d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();async function u(t,s=1,n=15){const e=`https://pixabay.com/api/?key=43059810-21766dfeafea29ca9c24ae0e2&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${s}&per_page=${n}`;try{return(await f.get(e)).data.hits}catch(r){return console.error("Error fetching data:",r),[]}}const p=new h("#gallery a",{});function m(t,s){const n=document.getElementById("gallery");t.forEach(o=>{const e=`
      <div class="card">
        <a href="${o.largeImageURL}" data-lightbox="image">
          <img src="${o.webformatURL}" alt="${o.tags}">
        </a>
        <div class="info">
          <p><strong>Likes</strong> <br>${o.likes}</p>
          <p><strong>Views</strong> <br>${o.views}</p>
          <p><strong>Comments</strong> <br>${o.comments}</p>
          <p><strong>Downloads</strong> <br>${o.downloads}</p>
        </div>
      </div>
    `;n.insertAdjacentHTML("beforeend",e)}),n.children.length>=s?(a(),c()):p.refresh()}function a(){const t=document.getElementById("load-more-btn");t.style.display="none"}function c(){const t=document.getElementById("end-message");t.style.display="block"}const b=document.getElementById("search-form"),i=document.getElementById("loader"),d=document.getElementById("load-more-btn");document.getElementById("end-message");let y="",g=1;function E(){const t=document.getElementById("end-message");t.style.display="none"}b.addEventListener("submit",async t=>{t.preventDefault();const n=document.getElementById("search-input").value.trim();if(!n){iziToast.error({title:"Error",message:"Please enter a search query!"});return}y=n,g=1,i.classList.remove("hidden");const o=document.getElementById("gallery");o.innerHTML="",E();try{const e=await u(n),r=e.totalHits;m(e,r),e.length===0||e.length<15?(a(),c()):d.style.display="block"}catch(e){console.error("Error searching for images:",e),a()}finally{i.classList.add("hidden")}});d.addEventListener("click",async()=>{i.classList.remove("hidden");try{const t=await u(y,g+1);m(t),g++;const s=document.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"}),t.length<15?(a(),c()):d.style.display="block"}catch(t){console.error("Error searching for images:",t)}finally{i.classList.add("hidden")}});
//# sourceMappingURL=commonHelpers.js.map
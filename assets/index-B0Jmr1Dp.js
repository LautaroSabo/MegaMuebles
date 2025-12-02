(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();let l=[],c=[];document.addEventListener("DOMContentLoaded",async()=>{try{l=await(await fetch("productos.json")).json(),y(l.filter(t=>t.tag==="oferta")),p("best-sellers-list",l.filter(t=>t.tag==="mas_vendido")),p("new-products-list",l.filter(t=>t.tag==="nuevo")),f(),x(),h(),v()}catch(e){console.error("Error loading products:",e)}});function v(){const e=document.getElementById("search-toggle"),t=document.getElementById("search-input"),o=document.getElementById("products-view"),n=document.getElementById("home-view"),a=document.getElementById("nav-products"),s=document.getElementById("nav-home");e.addEventListener("click",()=>{t.classList.contains("w-0")?(t.classList.remove("w-0","opacity-0"),t.classList.add("w-48","opacity-100"),t.focus()):(t.classList.remove("w-48","opacity-100"),t.classList.add("w-0","opacity-0"))}),document.addEventListener("click",r=>{!e.contains(r.target)&&!t.contains(r.target)&&(t.classList.remove("w-48","opacity-100"),t.classList.add("w-0","opacity-0"))}),t.addEventListener("input",r=>{const i=r.target.value.toLowerCase();n.classList.contains("hidden")===!1&&(n.classList.add("hidden"),o.classList.remove("hidden"),window.scrollTo(0,0),a.classList.add("text-black"),a.classList.remove("text-gray-500"),s.classList.add("text-gray-500"),s.classList.remove("text-black"));const u=l.filter(d=>d.name.toLowerCase().includes(i)||d.description.toLowerCase().includes(i));g(u)})}function f(){const e=document.getElementById("nav-home"),t=document.getElementById("nav-products"),o=document.getElementById("home-view"),n=document.getElementById("products-view"),a=r=>{r&&r.preventDefault(),o.classList.remove("hidden"),n.classList.add("hidden"),window.scrollTo(0,0),e.classList.add("text-black"),e.classList.remove("text-gray-500"),t.classList.add("text-gray-500"),t.classList.remove("text-black")},s=r=>{r&&r.preventDefault(),o.classList.add("hidden"),n.classList.remove("hidden"),g(l),window.scrollTo(0,0),t.classList.add("text-black"),t.classList.remove("text-gray-500"),e.classList.add("text-gray-500"),e.classList.remove("text-black")};e.addEventListener("click",a),t.addEventListener("click",s),window.navigateToProducts=()=>{s()}}function x(){const e=document.querySelectorAll(".filter-btn");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(a=>{a.classList.remove("bg-black","text-white","border-black"),a.classList.add("text-gray-500","border-gray-200")}),t.classList.remove("text-gray-500","border-gray-200"),t.classList.add("bg-black","text-white","border-black");const o=t.dataset.category,n=o==="all"?l:l.filter(a=>a.category===o);g(n)})})}function h(){window.openProductModal=e=>{const t=l.find(n=>n.id===e);if(!t)return;const o=document.getElementById("product-modal");document.getElementById("modal-image").src=t.image_url,document.getElementById("modal-title").textContent=t.name,document.getElementById("modal-price").textContent=`$${t.price}`,document.getElementById("modal-description").textContent=t.description,document.getElementById("modal-category").textContent=t.category||"General",document.getElementById("modal-quantity").textContent="1",o.dataset.productId=e,o.classList.remove("hidden")},window.closeModal=()=>{document.getElementById("product-modal").classList.add("hidden")},window.updateModalQuantity=e=>{const t=document.getElementById("modal-quantity");let o=parseInt(t.textContent);o+=e,o<1&&(o=1),t.textContent=o},window.addToCartFromModal=()=>{const e=document.getElementById("product-modal"),t=parseInt(e.dataset.productId),o=parseInt(document.getElementById("modal-quantity").textContent),n=l.find(a=>a.id===t);b(n,o),closeModal(),toggleCart()},window.toggleCart=()=>{const e=document.getElementById("cart-sidebar"),t=document.getElementById("cart-panel");e.classList.contains("hidden")?(e.classList.remove("hidden"),setTimeout(()=>{t.classList.remove("translate-x-full")},10)):(t.classList.add("translate-x-full"),setTimeout(()=>{e.classList.add("hidden")},300))},window.updateCartQuantity=(e,t)=>{const o=c.find(n=>n.id===e);o&&(o.quantity+=t,o.quantity<=0?removeFromCart(e):m())},window.removeFromCart=e=>{c=c.filter(t=>t.id!==e),m()},window.checkoutWhatsApp=()=>{if(c.length===0)return;let e=`Hola! Me gustaría realizar el siguiente pedido en Muebles Modernos:

`,t=0;c.forEach(n=>{const a=n.price*n.quantity;e+=`- ${n.quantity}x ${n.name} ($${n.price}) = $${a}
`,t+=a}),e+=`
*Total: $${t.toFixed(2)}*`;const o=encodeURIComponent(e);window.open(`https://wa.me/?text=${o}`,"_blank")},document.getElementById("cart-btn").addEventListener("click",toggleCart)}function b(e,t){const o=c.find(n=>n.id===e.id);o?o.quantity+=t:c.push({...e,quantity:t}),m()}function m(){const e=document.getElementById("cart-items"),t=document.getElementById("cart-badge"),o=document.getElementById("cart-total"),n=c.reduce((s,r)=>s+r.quantity,0);t.textContent=n,n>0?t.classList.remove("hidden"):t.classList.add("hidden"),e.innerHTML="";let a=0;c.length===0?e.innerHTML=`
            <div class="text-center text-gray-500 py-12">
                <p>Tu carrito está vacío.</p>
                <button onclick="toggleCart()" class="mt-4 text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1">Seguir comprando</button>
            </div>
        `:c.forEach(s=>{const r=s.price*s.quantity;a+=r;const i=document.createElement("div");i.className="flex gap-4",i.innerHTML=`
                <div class="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <img src="${s.image_url}" alt="${s.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="text-sm font-serif font-medium text-landmark-black mb-1">${s.name}</h4>
                    <p class="text-xs text-gray-500 mb-2">$${s.price}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center border border-gray-200">
                            <button onclick="updateCartQuantity(${s.id}, -1)" class="px-2 py-0.5 hover:bg-gray-50 text-xs">-</button>
                            <span class="px-2 py-0.5 text-xs font-medium min-w-[20px] text-center">${s.quantity}</span>
                            <button onclick="updateCartQuantity(${s.id}, 1)" class="px-2 py-0.5 hover:bg-gray-50 text-xs">+</button>
                        </div>
                        <button onclick="removeFromCart(${s.id})" class="text-xs text-gray-400 hover:text-red-500 underline">Eliminar</button>
                    </div>
                </div>
            `,e.appendChild(i)}),o.textContent=`$${a.toFixed(2)}`}function g(e){const t=document.getElementById("products-grid");t.innerHTML="",e.forEach(o=>{const n=document.createElement("div");n.className="group cursor-pointer",n.onclick=()=>window.openProductModal(o.id),n.innerHTML=`
            <div class="relative h-[350px] overflow-hidden bg-gray-100 mb-4">
                <img src="${o.image_url}" alt="${o.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Ver Producto
                    </button>
                </div>
                
                <!-- Tag -->
                <div class="absolute top-3 left-3">
                    ${o.tag==="nuevo"?'<span class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Nuevo</span>':""}
                    ${o.tag==="oferta"?'<span class="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Oferta</span>':""}
                </div>
            </div>
            
            <div class="text-center">
                <h3 class="text-base font-serif font-medium text-landmark-black mb-1 group-hover:text-gray-600 transition-colors">${o.name}</h3>
                <span class="text-sm font-bold tracking-wide">$${o.price}</span>
            </div>
        `,t.appendChild(n)})}function y(e){const t=document.getElementById("hero-carousel"),o=document.getElementById("carousel-indicators");let n=0;if(e.length===0)return;e.forEach((r,i)=>{const u=document.createElement("div");u.className="min-w-full h-full relative flex items-center justify-center bg-gray-900 text-white",u.innerHTML=`
            <img src="${r.image_url}" alt="${r.name}" class="absolute inset-0 w-full h-full object-cover opacity-70">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div class="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
                <span class="inline-block py-1 px-4 border border-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">Colección Exclusiva</span>
                <h1 class="text-5xl md:text-7xl font-serif font-medium mb-8 tracking-wide leading-tight">${r.name}</h1>
                <p class="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light tracking-wide">${r.description}</p>
                <div class="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button onclick="openProductModal(${r.id})" class="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors min-w-[200px]">
                        Ver Detalles
                    </button>
                    <button onclick="openProductModal(${r.id})" class="border border-white text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors min-w-[200px]">
                        Comprar Ahora
                    </button>
                </div>
            </div>
        `,t.appendChild(u);const d=document.createElement("button");d.className=`h-0.5 transition-all duration-300 ${i===0?"bg-white w-12":"bg-white/40 w-6 hover:bg-white/80"}`,d.addEventListener("click",()=>s(i)),o.appendChild(d)});const a=()=>{t.style.transform=`translateX(-${n*100}%)`,Array.from(o.children).forEach((r,i)=>{r.className=`h-0.5 transition-all duration-300 ${i===n?"bg-white w-12":"bg-white/40 w-6 hover:bg-white/80"}`})},s=r=>{n=r,n<0&&(n=e.length-1),n>=e.length&&(n=0),a()};document.getElementById("prev-slide").addEventListener("click",()=>s(n-1)),document.getElementById("next-slide").addEventListener("click",()=>s(n+1)),setInterval(()=>s(n+1),6e3)}function p(e,t){const o=document.getElementById(e);t.forEach(n=>{const a=document.createElement("div");a.className="min-w-[280px] md:min-w-[350px] snap-start group cursor-pointer",a.onclick=()=>window.openProductModal(n.id),a.innerHTML=`
            <div class="relative h-[400px] overflow-hidden bg-gray-100 mb-6">
                <img src="${n.image_url}" alt="${n.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Ver Producto
                    </button>
                </div>
                
                <!-- Tag -->
                <div class="absolute top-4 left-4">
                    ${n.tag==="nuevo"?'<span class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Nuevo</span>':""}
                    ${n.tag==="oferta"?'<span class="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Oferta</span>':""}
                </div>
            </div>
            
            <div class="text-center">
                <h3 class="text-lg font-serif font-medium text-landmark-black mb-2 group-hover:text-gray-600 transition-colors">${n.name}</h3>
                <p class="text-sm text-gray-500 font-light mb-3 line-clamp-1">${n.description}</p>
                <span class="text-sm font-bold tracking-wide">$${n.price}</span>
            </div>
        `,o.appendChild(a)})}const w="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='32'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20256'%3e%3cpath%20fill='%23F7DF1E'%20d='M0%200h256v256H0V0Z'%3e%3c/path%3e%3cpath%20d='m67.312%20213.932l19.59-11.856c3.78%206.701%207.218%2012.371%2015.465%2012.371c7.905%200%2012.89-3.092%2012.89-15.12v-81.798h24.057v82.138c0%2024.917-14.606%2036.259-35.916%2036.259c-19.245%200-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157%208.421%2011.859%2014.607%2023.715%2014.607c9.969%200%2016.325-4.984%2016.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044%2013.747-31.792%2035.228-31.792c15.294%200%2026.292%205.328%2034.196%2019.247l-18.732%2012.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046%200-11.514%204.468-11.514%2010.31c0%207.217%204.468%2010.14%2014.778%2014.608l6.014%202.577c20.45%208.765%2031.963%2017.7%2031.963%2037.804c0%2021.654-17.012%2033.51-39.867%2033.51c-22.339%200-36.774-10.654-43.819-24.574'%3e%3c/path%3e%3c/svg%3e",L="/MegaMuebles/vite.svg";function k(e){let t=0;const o=n=>{t=n,e.innerHTML=`count is ${t}`};e.addEventListener("click",()=>o(t+1)),o(0)}document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${L}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${w}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;k(document.querySelector("#counter"));

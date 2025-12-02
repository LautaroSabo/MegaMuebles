(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();let l=[],c=[];document.addEventListener("DOMContentLoaded",async()=>{try{l=await(await fetch("productos.json")).json(),h(l.filter(t=>t.tag==="oferta")),p("best-sellers-list",l.filter(t=>t.tag==="mas_vendido")),p("new-products-list",l.filter(t=>t.tag==="nuevo")),x(),b(),v(),f()}catch(n){console.error("Error loading products:",n)}});function f(){const n=document.getElementById("search-toggle"),t=document.getElementById("search-input"),o=document.getElementById("products-view"),e=document.getElementById("home-view"),a=document.getElementById("nav-products"),s=document.getElementById("nav-home");n.addEventListener("click",()=>{t.classList.contains("w-0")?(t.classList.remove("w-0","opacity-0"),t.classList.add("w-48","opacity-100"),t.focus()):(t.classList.remove("w-48","opacity-100"),t.classList.add("w-0","opacity-0"))}),document.addEventListener("click",r=>{!n.contains(r.target)&&!t.contains(r.target)&&(t.classList.remove("w-48","opacity-100"),t.classList.add("w-0","opacity-0"))}),t.addEventListener("input",r=>{const i=r.target.value.toLowerCase();e.classList.contains("hidden")===!1&&(e.classList.add("hidden"),o.classList.remove("hidden"),window.scrollTo(0,0),a.classList.add("text-black"),a.classList.remove("text-gray-500"),s.classList.add("text-gray-500"),s.classList.remove("text-black"));const u=l.filter(d=>d.name.toLowerCase().includes(i)||d.description.toLowerCase().includes(i));g(u)})}function x(){const n=document.getElementById("nav-home"),t=document.getElementById("nav-products"),o=document.getElementById("home-view"),e=document.getElementById("products-view"),a=r=>{r&&r.preventDefault(),o.classList.remove("hidden"),e.classList.add("hidden"),window.scrollTo(0,0),n.classList.add("text-black"),n.classList.remove("text-gray-500"),t.classList.add("text-gray-500"),t.classList.remove("text-black")},s=r=>{r&&r.preventDefault(),o.classList.add("hidden"),e.classList.remove("hidden"),g(l),window.scrollTo(0,0),t.classList.add("text-black"),t.classList.remove("text-gray-500"),n.classList.add("text-gray-500"),n.classList.remove("text-black")};n.addEventListener("click",a),t.addEventListener("click",s),window.navigateToProducts=()=>{s()}}function b(){const n=document.querySelectorAll(".filter-btn");n.forEach(t=>{t.addEventListener("click",()=>{n.forEach(a=>{a.classList.remove("bg-black","text-white","border-black"),a.classList.add("text-gray-500","border-gray-200")}),t.classList.remove("text-gray-500","border-gray-200"),t.classList.add("bg-black","text-white","border-black");const o=t.dataset.category,e=o==="all"?l:l.filter(a=>a.category===o);g(e)})})}function v(){window.openProductModal=n=>{const t=l.find(e=>e.id===n);if(!t)return;const o=document.getElementById("product-modal");document.getElementById("modal-image").src=t.image_url,document.getElementById("modal-title").textContent=t.name,document.getElementById("modal-price").textContent=`$${t.price}`,document.getElementById("modal-description").textContent=t.description,document.getElementById("modal-category").textContent=t.category||"General",document.getElementById("modal-quantity").textContent="1",o.dataset.productId=n,o.classList.remove("hidden")},window.closeModal=()=>{document.getElementById("product-modal").classList.add("hidden")},window.updateModalQuantity=n=>{const t=document.getElementById("modal-quantity");let o=parseInt(t.textContent);o+=n,o<1&&(o=1),t.textContent=o},window.addToCartFromModal=()=>{const n=document.getElementById("product-modal"),t=parseInt(n.dataset.productId),o=parseInt(document.getElementById("modal-quantity").textContent),e=l.find(a=>a.id===t);y(e,o),closeModal(),toggleCart()},window.toggleCart=()=>{const n=document.getElementById("cart-sidebar"),t=document.getElementById("cart-panel");n.classList.contains("hidden")?(n.classList.remove("hidden"),setTimeout(()=>{t.classList.remove("translate-x-full")},10)):(t.classList.add("translate-x-full"),setTimeout(()=>{n.classList.add("hidden")},300))},window.updateCartQuantity=(n,t)=>{const o=c.find(e=>e.id===n);o&&(o.quantity+=t,o.quantity<=0?removeFromCart(n):m())},window.removeFromCart=n=>{c=c.filter(t=>t.id!==n),m()},window.checkoutWhatsApp=()=>{if(c.length===0)return;let n=`Hola! Me gustaría realizar el siguiente pedido en Muebles Modernos:

`,t=0;c.forEach(e=>{const a=e.price*e.quantity;n+=`- ${e.quantity}x ${e.name} ($${e.price}) = $${a}
`,t+=a}),n+=`
*Total: $${t.toFixed(2)}*`;const o=encodeURIComponent(n);window.open(`https://wa.me/?text=${o}`,"_blank")},document.getElementById("cart-btn").addEventListener("click",toggleCart)}function y(n,t){const o=c.find(e=>e.id===n.id);o?o.quantity+=t:c.push({...n,quantity:t}),m()}function m(){const n=document.getElementById("cart-items"),t=document.getElementById("cart-badge"),o=document.getElementById("cart-total"),e=c.reduce((s,r)=>s+r.quantity,0);t.textContent=e,e>0?t.classList.remove("hidden"):t.classList.add("hidden"),n.innerHTML="";let a=0;c.length===0?n.innerHTML=`
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
            `,n.appendChild(i)}),o.textContent=`$${a.toFixed(2)}`}function g(n){const t=document.getElementById("products-grid");t.innerHTML="",n.forEach(o=>{const e=document.createElement("div");e.className="group cursor-pointer",e.onclick=()=>window.openProductModal(o.id),e.innerHTML=`
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
        `,t.appendChild(e)})}function h(n){const t=document.getElementById("hero-carousel"),o=document.getElementById("carousel-indicators");let e=0;if(n.length===0)return;n.forEach((r,i)=>{const u=document.createElement("div");u.className="min-w-full h-full relative flex items-center justify-center bg-gray-900 text-white",u.innerHTML=`
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
        `,t.appendChild(u);const d=document.createElement("button");d.className=`h-0.5 transition-all duration-300 ${i===0?"bg-white w-12":"bg-white/40 w-6 hover:bg-white/80"}`,d.addEventListener("click",()=>s(i)),o.appendChild(d)});const a=()=>{t.style.transform=`translateX(-${e*100}%)`,Array.from(o.children).forEach((r,i)=>{r.className=`h-0.5 transition-all duration-300 ${i===e?"bg-white w-12":"bg-white/40 w-6 hover:bg-white/80"}`})},s=r=>{e=r,e<0&&(e=n.length-1),e>=n.length&&(e=0),a()};document.getElementById("prev-slide").addEventListener("click",()=>s(e-1)),document.getElementById("next-slide").addEventListener("click",()=>s(e+1)),setInterval(()=>s(e+1),6e3)}function p(n,t){const o=document.getElementById(n);t.forEach(e=>{const a=document.createElement("div");a.className="min-w-[280px] md:min-w-[350px] snap-start group cursor-pointer",a.onclick=()=>window.openProductModal(e.id),a.innerHTML=`
            <div class="relative h-[400px] overflow-hidden bg-gray-100 mb-6">
                <img src="${e.image_url}" alt="${e.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Ver Producto
                    </button>
                </div>
                
                <!-- Tag -->
                <div class="absolute top-4 left-4">
                    ${e.tag==="nuevo"?'<span class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Nuevo</span>':""}
                    ${e.tag==="oferta"?'<span class="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Oferta</span>':""}
                </div>
            </div>
            
            <div class="text-center">
                <h3 class="text-lg font-serif font-medium text-landmark-black mb-2 group-hover:text-gray-600 transition-colors">${e.name}</h3>
                <p class="text-sm text-gray-500 font-light mb-3 line-clamp-1">${e.description}</p>
                <span class="text-sm font-bold tracking-wide">$${e.price}</span>
            </div>
        `,o.appendChild(a)})}

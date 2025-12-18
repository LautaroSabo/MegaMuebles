(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();let l=[],c=[];document.addEventListener("DOMContentLoaded",async()=>{try{l=await(await fetch("productos.json")).json(),L(l.filter(e=>e.tag==="oferta")),f("best-sellers-list",l.filter(e=>e.tag==="mas_vendido")),f("new-products-list",l.filter(e=>e.tag==="nuevo")),x(),b(),y(),h(),v()}catch(t){console.error("Error loading products:",t)}});function h(){const t=document.getElementById("search-toggle"),e=document.getElementById("search-input"),s=document.getElementById("search-container"),n=document.getElementById("products-view"),o=document.getElementById("home-view"),a=document.getElementById("nav-products"),i=document.getElementById("nav-home");t.addEventListener("click",()=>{e.classList.contains("w-0")?(e.classList.remove("w-0","opacity-0"),e.classList.add("w-48","opacity-100"),window.innerWidth<768&&(e.classList.remove("w-48"),e.classList.add("w-full"),s.classList.remove("absolute","right-0"),s.classList.add("fixed","top-0","left-0","w-full","h-20","bg-white","z-40","px-6","flex","items-center"),t.classList.add("hidden")),e.focus()):(e.classList.remove("w-48","opacity-100","w-full"),e.classList.add("w-0","opacity-0"),s.classList.add("absolute","right-0"),s.classList.remove("fixed","top-0","left-0","w-full","h-20","bg-white","z-40","px-6","flex","items-center"),t.classList.remove("hidden"))}),document.addEventListener("click",r=>{!t.contains(r.target)&&!s.contains(r.target)&&(e.classList.remove("w-48","opacity-100","w-full"),e.classList.add("w-0","opacity-0"),s.classList.add("absolute","right-0"),s.classList.remove("fixed","top-0","left-0","w-full","h-20","bg-white","z-40","px-6","flex","items-center"),t.classList.remove("hidden"),t.classList.remove("hidden"))}),e.addEventListener("input",r=>{const d=r.target.value.toLowerCase();o.classList.contains("hidden")===!1&&(o.classList.add("hidden"),n.classList.remove("hidden"),window.scrollTo(0,0),a.classList.add("text-black"),a.classList.remove("text-gray-500"),i.classList.add("text-gray-500"),i.classList.remove("text-black"));const u=l.filter(p=>p.name.toLowerCase().includes(d)||p.description.toLowerCase().includes(d));g(u)})}function x(){const t=document.getElementById("nav-home"),e=document.getElementById("nav-products"),s=document.getElementById("home-view"),n=document.getElementById("products-view"),o=i=>{i&&i.preventDefault(),s.classList.remove("hidden"),n.classList.add("hidden"),window.scrollTo(0,0),t.classList.add("text-black"),t.classList.remove("text-gray-500"),e.classList.add("text-gray-500"),e.classList.remove("text-black")},a=i=>{i&&i.preventDefault(),s.classList.add("hidden"),n.classList.remove("hidden"),g(l),window.scrollTo(0,0),e.classList.add("text-black"),e.classList.remove("text-gray-500"),t.classList.add("text-gray-500"),t.classList.remove("text-black")};t.addEventListener("click",o),e.addEventListener("click",a),window.navigateToProducts=()=>{a()}}function b(){const t=document.querySelectorAll(".filter-btn");t.forEach(e=>{e.addEventListener("click",()=>{t.forEach(o=>{o.classList.remove("bg-black","text-white","border-black"),o.classList.add("text-gray-500","border-gray-200")}),e.classList.remove("text-gray-500","border-gray-200"),e.classList.add("bg-black","text-white","border-black");const s=e.dataset.category,n=s==="all"?l:l.filter(o=>o.category===s);g(n)})})}function v(){const t=document.getElementById("mobile-menu-btn"),e=document.getElementById("mobile-menu"),s=document.getElementById("mobile-menu-close"),n=document.getElementById("search-wrapper"),o=e.querySelectorAll("a"),a=()=>{e.classList.remove("translate-x-full"),t.classList.add("hidden"),n&&n.classList.add("hidden")},i=()=>{e.classList.add("translate-x-full"),t.classList.remove("hidden"),n&&n.classList.remove("hidden")};t.addEventListener("click",a),s&&s.addEventListener("click",i),o.forEach(r=>{r.addEventListener("click",()=>{i(),r.id==="mobile-nav-home"?document.getElementById("nav-home").click():r.id==="mobile-nav-products"&&document.getElementById("nav-products").click()})})}function y(){window.openProductModal=t=>{const e=l.find(n=>n.id===t);if(!e)return;const s=document.getElementById("product-modal");document.getElementById("modal-image").src=e.image_url,document.getElementById("modal-title").textContent=e.name,document.getElementById("modal-price").textContent=`$${e.price}`,document.getElementById("modal-description").textContent=e.description,document.getElementById("modal-category").textContent=e.category||"General",document.getElementById("modal-quantity").textContent="1",s.dataset.productId=t,s.classList.remove("hidden")},window.closeModal=()=>{document.getElementById("product-modal").classList.add("hidden")},window.updateModalQuantity=t=>{const e=document.getElementById("modal-quantity");let s=parseInt(e.textContent);s+=t,s<1&&(s=1),e.textContent=s},window.addToCartFromModal=()=>{const t=document.getElementById("product-modal"),e=parseInt(t.dataset.productId),s=parseInt(document.getElementById("modal-quantity").textContent),n=l.find(o=>o.id===e);w(n,s),closeModal(),toggleCart()},window.toggleCart=()=>{const t=document.getElementById("cart-sidebar"),e=document.getElementById("cart-panel");t.classList.contains("hidden")?(t.classList.remove("hidden"),setTimeout(()=>{e.classList.remove("translate-x-full")},10)):(e.classList.add("translate-x-full"),setTimeout(()=>{t.classList.add("hidden")},300))},window.updateCartQuantity=(t,e)=>{const s=c.find(n=>n.id===t);s&&(s.quantity+=e,s.quantity<=0?removeFromCart(t):m())},window.removeFromCart=t=>{c=c.filter(e=>e.id!==t),m()},window.checkoutWhatsApp=()=>{if(c.length===0)return;let t=`Hola! Me gustaría realizar el siguiente pedido en Muebles Modernos:

`,e=0;c.forEach(n=>{const o=n.price*n.quantity;t+=`- ${n.quantity}x ${n.name} ($${n.price}) = $${o}
`,e+=o}),t+=`
*Total: $${e.toFixed(2)}*`;const s=encodeURIComponent(t);window.open(`https://wa.me/5493644729147?text=${s}`,"_blank")},document.getElementById("cart-btn").addEventListener("click",toggleCart)}function w(t,e){const s=c.find(n=>n.id===t.id);s?s.quantity+=e:c.push({...t,quantity:e}),m()}function m(){const t=document.getElementById("cart-items"),e=document.getElementById("cart-badge"),s=document.getElementById("cart-total"),n=c.reduce((a,i)=>a+i.quantity,0);e.textContent=n,n>0?e.classList.remove("hidden"):e.classList.add("hidden"),t.innerHTML="";let o=0;c.length===0?t.innerHTML=`
            <div class="text-center text-gray-500 py-12">
                <p>Tu carrito está vacío.</p>
                <button onclick="toggleCart()" class="mt-4 text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1">Seguir comprando</button>
            </div>
        `:c.forEach(a=>{const i=a.price*a.quantity;o+=i;const r=document.createElement("div");r.className="flex gap-4",r.innerHTML=`
                <div class="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <img src="${a.image_url}" alt="${a.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="text-sm font-serif font-medium text-landmark-black mb-1">${a.name}</h4>
                    <p class="text-xs text-gray-500 mb-2">$${a.price}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center border border-gray-200">
                            <button onclick="updateCartQuantity(${a.id}, -1)" class="px-2 py-0.5 hover:bg-gray-50 text-xs">-</button>
                            <span class="px-2 py-0.5 text-xs font-medium min-w-[20px] text-center">${a.quantity}</span>
                            <button onclick="updateCartQuantity(${a.id}, 1)" class="px-2 py-0.5 hover:bg-gray-50 text-xs">+</button>
                        </div>
                        <button onclick="removeFromCart(${a.id})" class="text-xs text-gray-400 hover:text-red-500 underline">Eliminar</button>
                    </div>
                </div>
            `,t.appendChild(r)}),s.textContent=`$${o.toFixed(2)}`}function g(t){const e=document.getElementById("products-grid");e.innerHTML="",t.forEach(s=>{const n=document.createElement("div");n.className="group cursor-pointer",n.onclick=()=>window.openProductModal(s.id),n.innerHTML=`
            <div class="relative h-[350px] overflow-hidden bg-gray-100 mb-4">
                <img src="${s.image_url}" alt="${s.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Ver Producto
                    </button>
                </div>
                
                <!-- Tag -->
                <div class="absolute top-3 left-3">
                    ${s.tag==="nuevo"?'<span class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Nuevo</span>':""}
                    ${s.tag==="oferta"?'<span class="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Oferta</span>':""}
                </div>
            </div>
            
            <div class="text-center">
                <h3 class="text-base font-serif font-medium text-landmark-black mb-1 group-hover:text-gray-600 transition-colors">${s.name}</h3>
                <span class="text-sm font-bold tracking-wide">$${s.price}</span>
            </div>
        `,e.appendChild(n)})}function L(t){const e=document.getElementById("hero-carousel"),s=document.getElementById("carousel-indicators");let n=0;if(t.length===0)return;t.forEach((i,r)=>{const d=document.createElement("div");d.className="min-w-full h-full relative flex items-center justify-center bg-gray-900 text-white",d.innerHTML=`
            <img src="${i.image_url}" alt="${i.name}" class="absolute inset-0 w-full h-full object-cover opacity-70">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div class="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
                <span class="inline-block py-1 px-4 border border-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">Colección Exclusiva</span>
                <h1 class="text-5xl md:text-7xl font-serif font-medium mb-8 tracking-wide leading-tight">${i.name}</h1>
                <p class="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light tracking-wide">${i.description}</p>
                <div class="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button onclick="openProductModal(${i.id})" class="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors min-w-[200px]">
                        Ver Detalles
                    </button>
                    <button onclick="openProductModal(${i.id})" class="border border-white text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors min-w-[200px]">
                        Comprar Ahora
                    </button>
                </div>
            </div>
        `,e.appendChild(d);const u=document.createElement("button");u.className=`h-0.5 transition-all duration-300 ${r===0?"bg-white w-12":"bg-white/40 w-6 hover:bg-white/80"}`,u.addEventListener("click",()=>a(r)),s.appendChild(u)});const o=()=>{e.style.transform=`translateX(-${n*100}%)`,Array.from(s.children).forEach((i,r)=>{i.className=`h-0.5 transition-all duration-300 ${r===n?"bg-white w-12":"bg-white/40 w-6 hover:bg-white/80"}`})},a=i=>{n=i,n<0&&(n=t.length-1),n>=t.length&&(n=0),o()};document.getElementById("prev-slide").addEventListener("click",()=>a(n-1)),document.getElementById("next-slide").addEventListener("click",()=>a(n+1)),setInterval(()=>a(n+1),6e3)}function f(t,e){const s=document.getElementById(t);e.forEach(n=>{const o=document.createElement("div");o.className="min-w-[280px] md:min-w-[350px] snap-start group cursor-pointer",o.onclick=()=>window.openProductModal(n.id),o.innerHTML=`
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
        `,s.appendChild(o)})}

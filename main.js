import './style.css'

let allProducts = [];
let cart = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('productos.json');
        allProducts = await response.json();

        // Initial Render (Home)
        renderHero(allProducts.filter(p => p.tag === 'oferta'));
        renderSection('best-sellers-list', allProducts.filter(p => p.tag === 'mas_vendido'));
        renderSection('new-products-list', allProducts.filter(p => p.tag === 'nuevo'));

        // Setup Navigation
        setupNavigation();

        // Setup Filters
        setupFilters();

        // Setup Cart
        setupCart();

        // Setup Search
        setupSearch();

        // Setup Mobile Menu
        setupMobileMenu();

    } catch (error) {
        console.error('Error loading products:', error);
    }
});

function setupSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchInput = document.getElementById('search-input');
    const searchContainer = document.getElementById('search-container');
    const productsView = document.getElementById('products-view');
    const homeView = document.getElementById('home-view');
    const navProducts = document.getElementById('nav-products');
    const navHome = document.getElementById('nav-home');

    // Toggle Search Bar
    searchToggle.addEventListener('click', () => {
        if (searchInput.classList.contains('w-0')) {
            // Open
            searchInput.classList.remove('w-0', 'opacity-0');
            searchInput.classList.add('w-48', 'opacity-100');

            // Mobile specific: expand container to full width and fixed position
            if (window.innerWidth < 768) {
                searchInput.classList.remove('w-48');
                searchInput.classList.add('w-full');

                searchContainer.classList.remove('absolute', 'right-0');
                searchContainer.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-20', 'bg-white', 'z-40', 'px-6', 'flex', 'items-center');

                // Hide the toggle button (magnifying glass)
                searchToggle.classList.add('hidden');
            }

            searchInput.focus();
        } else {
            // Close
            searchInput.classList.remove('w-48', 'opacity-100', 'w-full');
            searchInput.classList.add('w-0', 'opacity-0');

            // Reset mobile styles
            searchContainer.classList.add('absolute', 'right-0');
            searchContainer.classList.remove('fixed', 'top-0', 'left-0', 'w-full', 'h-20', 'bg-white', 'z-40', 'px-6', 'flex', 'items-center');

            // Show the toggle button again
            searchToggle.classList.remove('hidden');
        }
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchToggle.contains(e.target) && !searchContainer.contains(e.target)) {
            searchInput.classList.remove('w-48', 'opacity-100', 'w-full');
            searchInput.classList.add('w-0', 'opacity-0');

            // Reset mobile styles
            searchContainer.classList.add('absolute', 'right-0');
            searchContainer.classList.remove('fixed', 'top-0', 'left-0', 'w-full', 'h-20', 'bg-white', 'z-40', 'px-6', 'flex', 'items-center');

            // Show the toggle button again
            searchToggle.classList.remove('hidden');

            // Show the toggle button again
            searchToggle.classList.remove('hidden');
        }
    });

    // Real-time Filtering
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        // Switch to Products View if not active
        if (homeView.classList.contains('hidden') === false) {
            homeView.classList.add('hidden');
            productsView.classList.remove('hidden');
            window.scrollTo(0, 0);

            // Update Nav Styles
            navProducts.classList.add('text-black');
            navProducts.classList.remove('text-gray-500');
            navHome.classList.add('text-gray-500');
            navHome.classList.remove('text-black');
        }

        // Filter Products
        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );

        renderProductsPage(filtered);
    });
}

function setupNavigation() {
    const navHome = document.getElementById('nav-home');
    const navProducts = document.getElementById('nav-products');
    const homeView = document.getElementById('home-view');
    const productsView = document.getElementById('products-view');

    const showHome = (e) => {
        if (e) e.preventDefault();
        homeView.classList.remove('hidden');
        productsView.classList.add('hidden');
        window.scrollTo(0, 0);

        // Update Nav Styles
        navHome.classList.add('text-black');
        navHome.classList.remove('text-gray-500');
        navProducts.classList.add('text-gray-500');
        navProducts.classList.remove('text-black');
    };

    const showProducts = (e) => {
        if (e) e.preventDefault();
        homeView.classList.add('hidden');
        productsView.classList.remove('hidden');
        renderProductsPage(allProducts); // Render all by default
        window.scrollTo(0, 0);

        // Update Nav Styles
        navProducts.classList.add('text-black');
        navProducts.classList.remove('text-gray-500');
        navHome.classList.add('text-gray-500');
        navHome.classList.remove('text-black');
    };

    navHome.addEventListener('click', showHome);
    navProducts.addEventListener('click', showProducts);

    // Expose to global scope
    window.navigateToProducts = () => {
        showProducts();
    };
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            buttons.forEach(b => {
                b.classList.remove('bg-black', 'text-white', 'border-black');
                b.classList.add('text-gray-500', 'border-gray-200');
            });

            // Add active class to clicked
            btn.classList.remove('text-gray-500', 'border-gray-200');
            btn.classList.add('bg-black', 'text-white', 'border-black');

            const category = btn.dataset.category;
            const filtered = category === 'all'
                ? allProducts
                : allProducts.filter(p => p.category === category);

            renderProductsPage(filtered);
        });
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const searchWrapper = document.getElementById('search-wrapper');
    const links = menu.querySelectorAll('a');

    const openMenu = () => {
        menu.classList.remove('translate-x-full');
        btn.classList.add('hidden'); // Hide hamburger
        if (searchWrapper) searchWrapper.classList.add('hidden'); // Hide entire search container
    };

    const closeMenu = () => {
        menu.classList.add('translate-x-full');
        btn.classList.remove('hidden'); // Show hamburger
        if (searchWrapper) searchWrapper.classList.remove('hidden'); // Show entire search container
    };

    btn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close menu when link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();

            // Handle navigation logic if needed (reuse setupNavigation logic)
            if (link.id === 'mobile-nav-home') {
                document.getElementById('nav-home').click();
            } else if (link.id === 'mobile-nav-products') {
                document.getElementById('nav-products').click();
            }
        });
    });
}



// --- Cart & Modal Logic ---

function setupCart() {
    // Expose global functions for HTML onclick attributes
    window.openProductModal = (id) => {
        const product = allProducts.find(p => p.id === id);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        document.getElementById('modal-image').src = product.image_url;
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-price').textContent = `$${product.price}`;
        document.getElementById('modal-description').textContent = product.description;
        document.getElementById('modal-category').textContent = product.category || 'General';

        // Reset quantity
        document.getElementById('modal-quantity').textContent = '1';

        // Store current product ID for "Add to Cart"
        modal.dataset.productId = id;

        modal.classList.remove('hidden');
    };

    window.closeModal = () => {
        document.getElementById('product-modal').classList.add('hidden');
    };

    window.updateModalQuantity = (change) => {
        const qtySpan = document.getElementById('modal-quantity');
        let qty = parseInt(qtySpan.textContent);
        qty += change;
        if (qty < 1) qty = 1;
        qtySpan.textContent = qty;
    };

    window.addToCartFromModal = () => {
        const modal = document.getElementById('product-modal');
        const id = parseInt(modal.dataset.productId);
        const qty = parseInt(document.getElementById('modal-quantity').textContent);
        const product = allProducts.find(p => p.id === id);

        addToCart(product, qty);
        closeModal();
        toggleCart(); // Open cart to show confirmation
    };

    window.toggleCart = () => {
        const sidebar = document.getElementById('cart-sidebar');
        const panel = document.getElementById('cart-panel');

        if (sidebar.classList.contains('hidden')) {
            sidebar.classList.remove('hidden');
            // Small delay to allow display:block to apply before transition
            setTimeout(() => {
                panel.classList.remove('translate-x-full');
            }, 10);
        } else {
            panel.classList.add('translate-x-full');
            setTimeout(() => {
                sidebar.classList.add('hidden');
            }, 300); // Match transition duration
        }
    };

    window.updateCartQuantity = (id, change) => {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                updateCartUI();
            }
        }
    };

    window.removeFromCart = (id) => {
        cart = cart.filter(i => i.id !== id);
        updateCartUI();
    };

    window.checkoutWhatsApp = () => {
        if (cart.length === 0) return;

        let message = "Hola! Me gustaría realizar el siguiente pedido en Muebles Modernos:\n\n";
        let total = 0;

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            message += `- ${item.quantity}x ${item.name} ($${item.price}) = $${subtotal}\n`;
            total += subtotal;
        });

        message += `\n*Total: $${total.toFixed(2)}*`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    };

    // Attach to header button
    document.getElementById('cart-btn').addEventListener('click', toggleCart);
}

function addToCart(product, quantity) {
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');

    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    if (totalItems > 0) {
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }

    // Update List
    container.innerHTML = '';
    let totalPrice = 0;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-12">
                <p>Tu carrito está vacío.</p>
                <button onclick="toggleCart()" class="mt-4 text-xs font-bold uppercase tracking-widest text-black border-b border-black pb-1">Seguir comprando</button>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            totalPrice += subtotal;

            const div = document.createElement('div');
            div.className = 'flex gap-4';
            div.innerHTML = `
                <div class="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <img src="${item.image_url}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <h4 class="text-sm font-serif font-medium text-landmark-black mb-1">${item.name}</h4>
                    <p class="text-xs text-gray-500 mb-2">$${item.price}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center border border-gray-200">
                            <button onclick="updateCartQuantity(${item.id}, -1)" class="px-2 py-0.5 hover:bg-gray-50 text-xs">-</button>
                            <span class="px-2 py-0.5 text-xs font-medium min-w-[20px] text-center">${item.quantity}</span>
                            <button onclick="updateCartQuantity(${item.id}, 1)" class="px-2 py-0.5 hover:bg-gray-50 text-xs">+</button>
                        </div>
                        <button onclick="removeFromCart(${item.id})" class="text-xs text-gray-400 hover:text-red-500 underline">Eliminar</button>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    totalEl.textContent = `$${totalPrice.toFixed(2)}`;
}

// --- Render Functions (Updated with onclick) ---

function renderProductsPage(products) {
    const container = document.getElementById('products-grid');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'group cursor-pointer';
        // Added onclick to open modal
        card.onclick = () => window.openProductModal(product.id);

        card.innerHTML = `
            <div class="relative h-[350px] overflow-hidden bg-gray-100 mb-4">
                <img src="${product.image_url}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Ver Producto
                    </button>
                </div>
                
                <!-- Tag -->
                <div class="absolute top-3 left-3">
                    ${product.tag === 'nuevo' ? '<span class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Nuevo</span>' : ''}
                    ${product.tag === 'oferta' ? '<span class="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Oferta</span>' : ''}
                </div>
            </div>
            
            <div class="text-center">
                <h3 class="text-base font-serif font-medium text-landmark-black mb-1 group-hover:text-gray-600 transition-colors">${product.name}</h3>
                <span class="text-sm font-bold tracking-wide">$${product.price}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderHero(products) {
    const carouselContainer = document.getElementById('hero-carousel');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    let currentSlide = 0;

    if (products.length === 0) return;

    // Create slides
    products.forEach((product, index) => {
        const slide = document.createElement('div');
        slide.className = `min-w-full h-full relative flex items-center justify-center bg-gray-900 text-white`;
        slide.innerHTML = `
            <img src="${product.image_url}" alt="${product.name}" class="absolute inset-0 w-full h-full object-cover opacity-70">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div class="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
                <span class="inline-block py-1 px-4 border border-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">Colección Exclusiva</span>
                <h1 class="text-5xl md:text-7xl font-serif font-medium mb-8 tracking-wide leading-tight">${product.name}</h1>
                <p class="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light tracking-wide">${product.description}</p>
                <div class="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button onclick="openProductModal(${product.id})" class="bg-white text-black px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors min-w-[200px]">
                        Ver Detalles
                    </button>
                    <button onclick="openProductModal(${product.id})" class="border border-white text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors min-w-[200px]">
                        Comprar Ahora
                    </button>
                </div>
            </div>
        `;
        carouselContainer.appendChild(slide);

        // Create indicator
        const indicator = document.createElement('button');
        indicator.className = `h-0.5 transition-all duration-300 ${index === 0 ? 'bg-white w-12' : 'bg-white/40 w-6 hover:bg-white/80'}`;
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    // Carousel Logic
    const updateCarousel = () => {
        carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Update indicators
        Array.from(indicatorsContainer.children).forEach((btn, idx) => {
            btn.className = `h-0.5 transition-all duration-300 ${idx === currentSlide ? 'bg-white w-12' : 'bg-white/40 w-6 hover:bg-white/80'}`;
        });
    };

    const goToSlide = (index) => {
        currentSlide = index;
        if (currentSlide < 0) currentSlide = products.length - 1;
        if (currentSlide >= products.length) currentSlide = 0;
        updateCarousel();
    };

    document.getElementById('prev-slide').addEventListener('click', () => goToSlide(currentSlide - 1));
    document.getElementById('next-slide').addEventListener('click', () => goToSlide(currentSlide + 1));

    // Auto advance
    setInterval(() => goToSlide(currentSlide + 1), 6000);
}

function renderSection(containerId, products) {
    const container = document.getElementById(containerId);

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'min-w-[280px] md:min-w-[350px] snap-start group cursor-pointer';
        // Added onclick
        card.onclick = () => window.openProductModal(product.id);

        card.innerHTML = `
            <div class="relative h-[400px] overflow-hidden bg-gray-100 mb-6">
                <img src="${product.image_url}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                
                <!-- Overlay Actions -->
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button class="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                        Ver Producto
                    </button>
                </div>
                
                <!-- Tag -->
                <div class="absolute top-4 left-4">
                    ${product.tag === 'nuevo' ? '<span class="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Nuevo</span>' : ''}
                    ${product.tag === 'oferta' ? '<span class="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Oferta</span>' : ''}
                </div>
            </div>
            
            <div class="text-center">
                <h3 class="text-lg font-serif font-medium text-landmark-black mb-2 group-hover:text-gray-600 transition-colors">${product.name}</h3>
                <p class="text-sm text-gray-500 font-light mb-3 line-clamp-1">${product.description}</p>
                <span class="text-sm font-bold tracking-wide">$${product.price}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Modern Page Transition Manager
class PageTransitionManager {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        // Add transition class to body
        document.body.classList.add('page-transition');
        
        // Set up staggered animations for cards
        this.setupStaggeredAnimations();
        
        // Intercept navigation links
        this.interceptNavigation();
        
        // Trigger page load animation after a short delay
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    setupStaggeredAnimations() {
        // Set animation order for app cards
        const appCards = document.querySelectorAll('.app-card');
        appCards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });

        // Set animation order for game cards
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });

        // Set animation order for setting cards
        const settingCards = document.querySelectorAll('.setting-card');
        settingCards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });
    }

    interceptNavigation() {
        // Intercept all navigation links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && this.shouldIntercept(link)) {
                e.preventDefault();
                this.navigateTo(link.href);
            }
        });

        // Intercept search input
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target.value.trim();
                    if (!input) return;
                    this.handleSearch(input);
                }
            });
        }
    }

    shouldIntercept(link) {
        const href = link.href;
        const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
        const isAnchor = href.includes('#');
        const isSpecial = href.includes('javascript:') || href.includes('mailto:') || href.includes('tel:');
        
        // Don't intercept proxy or login pages
        const isProxyPage = window.location.pathname.includes('proxy.html');
        const isLoginPage = window.location.pathname.includes('login.html');
        
        if (isProxyPage || isLoginPage) {
            return false;
        }
        
        return !isExternal && !isAnchor && !isSpecial;
    }

    async navigateTo(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        try {
            // Start fade out animation
            document.body.classList.add('page-leaving');
            
            // Wait for transition to complete
            await this.waitForTransition();
            
            // Navigate
            window.location.href = url;
            
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = url;
        }
    }

    async handleSearch(input) {
        try {
            // Start fade out animation
            document.body.classList.add('page-leaving');
            
            // Wait for transition to complete
            await this.waitForTransition();
            
            // Encode URL
            const encodedUrl = await chemical.encode(input, {
                service: "uv",
                autoHttps: true,
                searchEngine: "https://www.google.com/search?q=%s"
            });

            sessionStorage.setItem("encodedUrl", encodedUrl);
            window.location.href = "proxy.html";
            
        } catch (error) {
            console.error('Search error:', error);
            window.location.href = "proxy.html";
        }
    }

    waitForTransition() {
        return new Promise((resolve) => {
            // Listen for transition end
            const handleTransitionEnd = () => {
                document.body.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            };
            
            document.body.addEventListener('transitionend', handleTransitionEnd);
            
            // Fallback timeout
            setTimeout(resolve, 500);
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pageTransitionManager = new PageTransitionManager();
    });
} else {
    window.pageTransitionManager = new PageTransitionManager();
} 
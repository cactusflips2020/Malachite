class PageTransitionManager {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }

    init() {
        document.body.classList.add('page-transition');
        
        this.setupStaggeredAnimations();
        
        this.interceptNavigation();
        
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        document.addEventListener('focusin', (e) => {
            if (e.target.tagName === 'SELECT' || 
                e.target.tagName === 'INPUT' || 
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'TEXTAREA') {
                e.stopPropagation();
            }
        });
    }

    setupStaggeredAnimations() {
        const appCards = document.querySelectorAll('.app-card');
        appCards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });

        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });

        const settingCards = document.querySelectorAll('.setting-card');
        settingCards.forEach((card, index) => {
            card.style.setProperty('--animation-order', index);
        });
    }

    interceptNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'SELECT' || 
                e.target.tagName === 'OPTION' || 
                e.target.tagName === 'INPUT' || 
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'TEXTAREA' ||
                e.target.closest('select') ||
                e.target.closest('input') ||
                e.target.closest('button') ||
                e.target.closest('.setting-card') ||
                e.target.closest('.settings-container')) {
                return;
            }
            
            const link = e.target.closest('a');
            if (link && this.shouldIntercept(link)) {
                e.preventDefault();
                this.navigateTo(link.href);
            }
        });
        
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
            document.body.classList.add('page-leaving');
            
            await this.waitForTransition();
            
            window.location.href = url;
            
        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = url;
        }
    }

    async handleSearch(input) {
        try {
            document.body.classList.add('page-leaving');
            
            await this.waitForTransition();
            
            const searchEngineUrl = localStorage.getItem('searchEngineSelectUrl') || "https://www.duckduckgo.com/?q=%s";
            const proxyBackend = localStorage.getItem('proxyBackendSelect') || "uv";
            
            const encodedUrl = await chemical.encode(input, {
                service: proxyBackend,
                autoHttps: true,
                searchEngine: searchEngineUrl
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
            const handleTransitionEnd = () => {
                document.body.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            };
            
            document.body.addEventListener('transitionend', handleTransitionEnd);
            
            setTimeout(resolve, 500);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pageTransitionManager = new PageTransitionManager();
    });
} else {
    window.pageTransitionManager = new PageTransitionManager();
} 
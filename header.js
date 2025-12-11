 const secs = document.querySelectorAll('.nav-section');
        const links = document.querySelectorAll('.nav-link-item');
        

        const normalizeHref = (href) => {
            if (!href) return '';
            const a = document.createElement('a');
            a.href = href;
            let normalized = a.pathname.replace(/\/+$/, '');
            if (normalized === '') normalized = '/';
            return normalized;
        };

        const currentPath = normalizeHref(window.location.href.split('#')[0]);
        const isHomePage = currentPath === '/';

        if (links.length) {
            const ACTIVE_CLASSES_DESKTOP = ['text-primary-blue', 'font-bold'];
            const ACTIVE_CLASSES_MOBILE = ['bg-primary-blue', 'text-white'];
            
            const INACTIVE_CLASSES_DESKTOP = ['text-dark-blue', 'font-medium', 'hover:text-primary-blue'];
            const INACTIVE_CLASSES_MOBILE = ['block', 'px-3', 'py-2', 'rounded-md', 'text-base', 'font-medium', 'text-dark-blue', 'hover:bg-light-gray', 'hover:text-primary-blue'];

            const applyActiveClasses = (l) => {
                l.classList.remove(...INACTIVE_CLASSES_DESKTOP, ...INACTIVE_CLASSES_MOBILE, ...ACTIVE_CLASSES_DESKTOP, ...ACTIVE_CLASSES_MOBILE);
                
                if (window.innerWidth >= 1024) {
                    l.classList.add(...ACTIVE_CLASSES_DESKTOP);
                } else {
                    l.classList.add(...ACTIVE_CLASSES_MOBILE, 'block', 'px-3', 'py-2', 'rounded-md', 'text-base');
                }
            };

            const removeActiveClasses = (l) => {
                l.classList.remove(...ACTIVE_CLASSES_DESKTOP, ...ACTIVE_CLASSES_MOBILE);
                if (window.innerWidth >= 1024) {
                    l.classList.remove(...INACTIVE_CLASSES_DESKTOP, ...INACTIVE_CLASSES_MOBILE); // Ensure old classes are gone
                    l.classList.add(...INACTIVE_CLASSES_DESKTOP);
                } else {
                    l.classList.remove(...INACTIVE_CLASSES_DESKTOP, ...INACTIVE_CLASSES_MOBILE); // Ensure old classes are gone
                    l.classList.add(...INACTIVE_CLASSES_MOBILE);
                }
            };

            const setActive = () => {
                let currId = '';
                const pos = window.scrollY; 
                const isTop = pos < 50; 
                if (isHomePage && secs.length && !isTop) {
                    for (let i = secs.length - 1; i >= 0; i--) {
                        const s = secs[i];
                        const top = s.offsetTop - 100; // Adjusted offset for better scroll detection
                        if (pos >= top) {
                            currId = s.id;
                            break;
                        }
                    }
                }
                
                links.forEach(l => {

                    removeActiveClasses(l); 
                    
                    const linkHref = l.getAttribute('href');
                    const linkPath = normalizeHref(linkHref.split('#')[0]);
                    const linkHash = linkHref.includes('#') ? linkHref.substring(linkHref.indexOf('#') + 1) : '';
                    
                    let shouldBeActive = false;
                    
                    if (linkPath === currentPath && linkPath !== '/') {
                        shouldBeActive = true;
                    } 
                    
                    else if (isHomePage && currId && linkHash === currId) {
                        shouldBeActive = true;
                    } 
                    
                    else if (isHomePage && linkPath === '/' && !linkHash) {
                        if (isTop || !currId) {
                            shouldBeActive = true;
                        }
                    }
                    
                   
                    if (shouldBeActive) {
                        applyActiveClasses(l);
                    }
                });
            };

            // Force a check on load, resize, and scroll
            window.addEventListener('scroll', setActive);
            window.addEventListener('resize', setActive);
            setActive(); 
        }
       

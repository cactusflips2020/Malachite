// Centralized particle configurations using CSS variables from themes.css
function getParticleConfig() {
    // Get CSS variables from the current theme
    const style = getComputedStyle(document.body);
    
    return {
        particles: {
            number: { value: 40, density: { enable: true, value_area: 800 } },
            color: { 
                value: [
                    style.getPropertyValue('--particle-color-1').trim(),
                    style.getPropertyValue('--particle-color-2').trim(),
                    style.getPropertyValue('--particle-color-3').trim(),
                    style.getPropertyValue('--particle-color-4').trim()
                ]
            },
            shape: { type: 'circle' },
            opacity: { 
                value: parseFloat(style.getPropertyValue('--particle-opacity').trim()) || 0.3, 
                random: true, 
                anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } 
            },
            size: { value: 2, random: true, anim: { enable: false, speed: 2, size_min: 1, sync: false } },
            line_linked: { 
                enable: true, 
                distance: 200, 
                color: style.getPropertyValue('--particle-line-color').trim(), 
                opacity: parseFloat(style.getPropertyValue('--particle-line-opacity').trim()) || 0.2, 
                width: 0.5 
            },
            move: { 
                enable: true, 
                speed: 1.5, 
                direction: 'none', 
                random: true, 
                straight: false, 
                out_mode: 'bounce', 
                bounce: true, 
                attract: { enable: false, rotateX: 600, rotateY: 1200 } 
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false, mode: 'repulse' },
                onclick: { enable: false, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 150, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    };
}

function getLoadingParticleConfig() {
    const style = getComputedStyle(document.body);
    
    return {
        particles: {
            number: { value: 25, density: { enable: true, value_area: 800 } },
            color: { 
                value: [
                    style.getPropertyValue('--particle-color-1').trim(),
                    style.getPropertyValue('--particle-color-2').trim(),
                    style.getPropertyValue('--particle-color-3').trim(),
                    style.getPropertyValue('--particle-color-4').trim()
                ]
            },
            shape: { type: 'circle' },
            opacity: { 
                value: parseFloat(style.getPropertyValue('--particle-opacity').trim()) || 0.3, 
                random: true, 
                anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } 
            },
            size: { value: 1.5, random: true, anim: { enable: false, speed: 2, size_min: 1, sync: false } },
            line_linked: { 
                enable: true, 
                distance: 150, 
                color: style.getPropertyValue('--particle-line-color').trim(), 
                opacity: parseFloat(style.getPropertyValue('--particle-line-opacity').trim()) || 0.2, 
                width: 0.5 
            },
            move: { 
                enable: true, 
                speed: 1, 
                direction: 'none', 
                random: true, 
                straight: false, 
                out_mode: 'bounce', 
                bounce: true, 
                attract: { enable: false, rotateX: 600, rotateY: 1200 } 
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: false, mode: 'repulse' },
                onclick: { enable: false, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                repulse: { distance: 150, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 }
            }
        },
        retina_detect: true
    };
}
 
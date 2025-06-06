// Navigation Validation Script
// Add this to browser console to check if navigation fixes are applied

console.log('🔍 ShoreSquad Navigation Validation');

// Check if navigation elements exist
const navbar = document.querySelector('.navbar');
const navContainer = document.querySelector('.nav-container');
const navLogo = document.querySelector('.nav-logo');
const navMenu = document.querySelector('.nav-menu');
const navActions = document.querySelector('.nav-actions');

console.log('✅ Navigation elements found:', {
    navbar: !!navbar,
    navContainer: !!navContainer,
    navLogo: !!navLogo,
    navMenu: !!navMenu,
    navActions: !!navActions
});

// Check flex properties
if (navContainer) {
    const containerStyles = getComputedStyle(navContainer);
    console.log('📐 Nav Container Styles:', {
        display: containerStyles.display,
        alignItems: containerStyles.alignItems,
        height: containerStyles.height
    });
}

if (navLogo) {
    const logoStyles = getComputedStyle(navLogo);
    console.log('📏 Nav Logo Flex:', logoStyles.flex);
}

if (navMenu) {
    const menuStyles = getComputedStyle(navMenu);
    console.log('📏 Nav Menu Flex:', menuStyles.flex);
}

if (navActions) {
    const actionsStyles = getComputedStyle(navActions);
    console.log('📏 Nav Actions Flex:', actionsStyles.flex);
}

// Check hover effects
const navLinks = document.querySelectorAll('.nav-link');
console.log('🎯 Nav Links Found:', navLinks.length);

navLinks.forEach((link, index) => {
    const styles = getComputedStyle(link);
    console.log(`Nav Link ${index + 1} transition:`, styles.transition);
});

// Test mobile menu
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    console.log('📱 Mobile menu toggle found');
    
    // Test click functionality
    navToggle.addEventListener('click', () => {
        console.log('📱 Mobile menu clicked');
        const isActive = navMenu.classList.contains('active');
        console.log('📱 Menu active state:', !isActive);
    });
}

console.log('🎉 Navigation validation complete!');
console.log('💡 Check the browser to see if spacing is even and hover effects work smoothly.');

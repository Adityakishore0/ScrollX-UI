import { useEffect } from 'react';

const useNavbarScripts = () => {
  useEffect(() => {
    const mobileMenuButton = document.getElementById(
      'mobile-menu-button'
    ) as HTMLElement | null;
    const mobileMenu = document.getElementById(
      'mobile-menu'
    ) as HTMLElement | null;

    if (!mobileMenuButton || !mobileMenu) return;

    const toggleMenu = () => {
      const isHidden = mobileMenu.classList.contains('hidden');

      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('animate__animated', 'animate__fadeIn');
        mobileMenuButton.setAttribute('aria-label', 'Close menu');
        mobileMenuButton.innerHTML = `
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>`;
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-label', 'Open menu');
        mobileMenuButton.innerHTML = `
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>`;
      }
    };

    mobileMenuButton.addEventListener('click', toggleMenu);

    // Close menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    const closeMenuOnClick = () => {
      mobileMenu.classList.add('hidden');
      mobileMenuButton.innerHTML = `
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>`;
    };

    mobileMenuLinks.forEach((link) => {
      link.addEventListener('click', closeMenuOnClick);
    });

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      mobileMenuButton.removeEventListener('click', toggleMenu);
      mobileMenuLinks.forEach((link) => {
        link.removeEventListener('click', closeMenuOnClick);
      });
    };
  }, []);
};

export default useNavbarScripts;

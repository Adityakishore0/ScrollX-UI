import { useEffect } from 'react';

const useFooterScripts = () => {
  useEffect(() => {
    // Back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');

    // Show/hide back to top button based on scroll position
    const handleScroll = () => {
      if (backToTopButton) {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add('opacity-100');
          backToTopButton.classList.remove('opacity-0');
        } else {
          backToTopButton.classList.add('opacity-0');
          backToTopButton.classList.remove('opacity-100');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Smooth scroll to top when button is clicked
    if (backToTopButton) {
      backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('footer form');

    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector(
          'input[type="email"]'
        ) as HTMLInputElement;
        const submitButton = newsletterForm.querySelector(
          'button[type="submit"]'
        ) as HTMLButtonElement;

        if (emailInput && submitButton) {
          // Simple validation
          if (!emailInput.value.trim()) {
            emailInput.classList.add('border-red-500');
            return;
          }

          // Show loading state
          const originalButtonText = submitButton.textContent;
          submitButton.textContent = 'Subscribing...';
          submitButton.disabled = true;

          // Simulate subscription process
          setTimeout(() => {
            // Reset form and show success
            emailInput.value = '';
            submitButton.textContent = 'Subscribed!';
            submitButton.classList.add('bg-green-600');
            submitButton.classList.remove('bg-primary', 'hover:bg-blue-600');

            // Reset button after 2 seconds
            setTimeout(() => {
              submitButton.textContent = originalButtonText;
              submitButton.disabled = false;
              submitButton.classList.remove('bg-green-600');
              submitButton.classList.add('bg-primary', 'hover:bg-blue-600');
            }, 2000);
          }, 1500);
        }
      });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (backToTopButton) {
        backToTopButton.removeEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        });
      }
      if (newsletterForm) {
        newsletterForm.removeEventListener('submit', (e) => {
          e.preventDefault();
        });
      }
    };
  }, []);
};

export default useFooterScripts;

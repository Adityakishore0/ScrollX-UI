import { useEffect } from 'react';

const useDemoScripts = () => {
  useEffect(() => {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.demo-tab-btn');
    const tabContents = document.querySelectorAll('.demo-tab-content');

    function setActiveTab(tabId: string) {
      // Remove active class from all tabs
      tabButtons.forEach((btn) => {
        btn.classList.remove('active', 'text-blue-400', 'border-blue-400');
        btn.classList.add('text-gray-400');
      });

      tabContents.forEach((content) => {
        content.classList.add('hidden');
      });

      // Add active class to current tab
      const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
      if (activeButton) {
        activeButton.classList.add(
          'active',
          'text-blue-400',
          'border-blue-400'
        );
        activeButton.classList.remove('text-gray-400');
      }

      const activeContent = document.getElementById(`${tabId}-tab`);
      if (activeContent) {
        activeContent.classList.remove('hidden');
      }
    }

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) {
          setActiveTab(tabId);
        }
      });
    });

    // Handle "next" buttons
    const nextButtons = document.querySelectorAll('.demo-next-btn');
    nextButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const nextTab = button.getAttribute('data-next');
        if (nextTab) {
          setActiveTab(nextTab);

          // If clicking to generating tab, simulate progress
          if (nextTab === 'generating') {
            simulateGeneration();
          }
        }
      });
    });

    // Simulate generation progress for demo
    function simulateGeneration() {
      const progressBar = document.getElementById('progress-bar');
      const generationLog = document.getElementById('generation-log');
      const continueButton = document.querySelector('[data-next="preview"]');

      if (!progressBar || !generationLog || !continueButton) return;

      let progress = 0;
      const logMessages = [
        'Creating page layouts and components...',
        'Generating responsive styles with Tailwind CSS...',
        'Adding TypeScript interfaces and types...',
        'Setting up navigation and routing...',
        'Implementing theme customization...',
        'Optimizing for performance...',
        'Finalizing project structure...',
      ];

      const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;

        if (progress % 15 === 0 && logMessages.length > 0) {
          const message = logMessages.shift();
          if (message) {
            const logEntry = document.createElement('div');
            logEntry.className = 'flex items-start';
            logEntry.innerHTML = `
              <span class="text-blue-400 animate-pulse mr-2">⟳</span>
              <span>${message}</span>
            `;
            generationLog.appendChild(logEntry);
            generationLog.scrollTop = generationLog.scrollHeight;
          }
        }

        if (progress >= 100) {
          clearInterval(interval);

          // Update the last message to completed
          const allLogs = generationLog.querySelectorAll('.flex');
          allLogs.forEach((log) => {
            log.innerHTML = `
              <span class="text-green-400 mr-2">✓</span>
              <span>${log.querySelector('span:last-child')?.textContent}</span>
            `;
          });

          // Add final message
          const finalLogEntry = document.createElement('div');
          finalLogEntry.className = 'flex items-start';
          finalLogEntry.innerHTML = `
            <span class="text-green-400 mr-2">✓</span>
            <span>Website successfully generated! Ready for preview.</span>
          `;
          generationLog.appendChild(finalLogEntry);

          // Enable continue button
          continueButton.classList.remove('opacity-50');
          (continueButton as HTMLButtonElement).disabled = false;
        }
      }, 200);
    }
  }, []);
};

export default useDemoScripts;

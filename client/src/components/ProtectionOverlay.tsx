import { useState, useEffect } from 'react';

const ProtectionOverlay = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // Disable right-click (silent)
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable F12, Ctrl+Shift+I, Ctrl+U, Ctrl+Shift+C
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        showProtectionWarning();
        return;
      }

      // Ctrl+Shift+I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showProtectionWarning();
        return;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showProtectionWarning();
        return;
      }

      // Ctrl+Shift+C (Inspect Element)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        showProtectionWarning();
        return;
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        showProtectionWarning();
        return;
      }
    };

    const showProtectionWarning = () => {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    // Additional protection against copy (silent)
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    document.addEventListener('copy', handleCopy);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="royal-card p-8 max-w-md mx-4 text-center">
        <div className="text-white mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-9a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="bugatti-title text-2xl text-white mb-3">
          Access Restricted
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          The source code is protected. Appreciate the artistry from the surface.
        </p>
        <div className="mt-6">
          <div className="text-white/40 text-xs uppercase tracking-wider">
            Bugatti • Premium Experience
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectionOverlay;
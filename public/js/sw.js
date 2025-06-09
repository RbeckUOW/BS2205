if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function (registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function (error) {
        console.log('Service Worker registration failed:', error);
      });
  }

  // Show/hide the offline banner based on network status
  window.addEventListener('offline', function () {
    document.getElementById('offline-banner').style.display = 'block';
  });

  window.addEventListener('online', function () {
    document.getElementById('offline-banner').style.display = 'none';
  });
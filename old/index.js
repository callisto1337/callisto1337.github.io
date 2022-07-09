if ('serviceWorker' in navigator) {
    // Wait for the 'load' event to not block other work
    window.addEventListener('load', async () => {
        // Try to register the service worker.
        try {
            const reg = await navigator.serviceWorker.register('sw.js');
            console.log('Service worker registered! 😎', reg);
        } catch (err) {
            console.log('😥 Service worker registration failed: ', err);
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
  // create URLSearchParams object here
  const urlParams = new URLSearchParams(window.location.search);

  try {
    const errorParamRaw = urlParams.get('error');
    const errorMsgRaw = urlParams.get('message');

    if (errorParamRaw && errorParamRaw.toString().toLowerCase() !== 'false') {
      const errorModalEl = document.getElementById('errorModal');
      if (!errorModalEl) return;

      const errorModalBody = document.getElementById('errorModalBody');
      const message = errorMsgRaw ? errorMsgRaw : 'Произошла ошибка';
      errorModalBody.textContent = message;

      const errorModal = new bootstrap.Modal(errorModalEl, {
        backdrop: true,
        keyboard: true
      });

      errorModal.show();

      // auto-hide after 5 seconds
      const autoHideTimer = setTimeout(() => {
        try { errorModal.hide(); } catch (_) {}
      }, 10000);

      errorModalEl.addEventListener('hidden.bs.modal', () => {
        clearTimeout(autoHideTimer);
        window.location.href = window.location.pathname; // remove query params
      });
      
    }
  } catch (e) {
    console.error('Error handling URL error param:', e);
  }
});

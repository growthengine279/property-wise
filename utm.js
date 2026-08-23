// Captures utm_source/utm_medium/utm_campaign/utm_content/utm_term from the
// landing URL and keeps them in sessionStorage so every page in the funnel
// (opt-in, offer, questionnaire, schedule, thank-you) can attach them to the
// GHL webhook payloads, even after the visitor clicks through several pages.
(function () {
  var KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var params = new URLSearchParams(window.location.search);
  var hasAny = KEYS.some(function (k) { return params.has(k); });
  if (hasAny) {
    var stored = {};
    KEYS.forEach(function (k) { stored[k] = params.get(k) || ''; });
    sessionStorage.setItem('pw_utms', JSON.stringify(stored));
  }

  window.getStoredUTMs = function () {
    var out = {};
    KEYS.forEach(function (k) { out[k] = ''; });
    try {
      var saved = JSON.parse(sessionStorage.getItem('pw_utms') || '{}');
      KEYS.forEach(function (k) { if (saved[k]) out[k] = saved[k]; });
    } catch (e) {}
    return out;
  };
})();

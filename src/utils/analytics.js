const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const UTM_STORAGE_KEY = 'hostal_donde_maru_utm_params';

const isBrowser = () => typeof window !== 'undefined';

const isPresent = (value) => value !== undefined && value !== null && String(value).trim() !== '';

const readCurrentUtmParams = () => {
  if (!isBrowser()) return {};

  const searchParams = new URLSearchParams(window.location.search);

  return UTM_KEYS.reduce((params, key) => {
    const value = searchParams.get(key);

    if (isPresent(value)) {
      params[key] = value.trim();
    }

    return params;
  }, {});
};

const readStoredUtmParams = () => {
  if (!isBrowser()) return {};

  try {
    const storedParams = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    return storedParams ? JSON.parse(storedParams) : {};
  } catch {
    return {};
  }
};

export const captureUtmParams = () => {
  if (!isBrowser()) return {};

  const currentUtmParams = readCurrentUtmParams();

  if (Object.keys(currentUtmParams).length === 0) {
    return readStoredUtmParams();
  }

  try {
    window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(currentUtmParams));
  } catch {
    // Tracking must never block the booking flow.
  }

  return currentUtmParams;
};

export const getUtmParams = () => ({
  ...readStoredUtmParams(),
  ...readCurrentUtmParams(),
});

const getCampaignFromPath = () => {
  if (!isBrowser()) return undefined;

  return window.location.pathname.includes('parasuramericanos-valledupar-2026')
    ? 'parasuramericanos-2026'
    : undefined;
};

const cleanPayload = (payload) =>
  Object.entries(payload).reduce((cleanedPayload, [key, value]) => {
    if (isPresent(value)) {
      cleanedPayload[key] = value;
    }

    return cleanedPayload;
  }, {});

export const pushAnalyticsEvent = (eventName, params = {}) => {
  if (!isBrowser() || !isPresent(eventName)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(cleanPayload({ event: eventName, ...params }));
};

export const trackWhatsAppCtaClick = ({ ctaLocation, campaign, roomType, packageName } = {}) => {
  if (!isBrowser()) return;

  const utmParams = getUtmParams();

  pushAnalyticsEvent('whatsapp_cta_click', {
    cta_location: ctaLocation,
    page_path: window.location.pathname,
    campaign: campaign ?? getCampaignFromPath() ?? utmParams.utm_campaign,
    room_type: roomType,
    package_name: packageName,
    ...utmParams,
  });
};

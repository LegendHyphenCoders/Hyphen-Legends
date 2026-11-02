/**
 * Centralized API Client Configuration for HL Stack.
 * Intelligently resolves the API endpoint URL:
 * - If VITE_API_URL is configured with an external URL (e.g. Render backend), uses it.
 * - In local development or when accessed from mobile devices on LAN (Wi-Fi),
 *   uses relative path (/api/...) so Vite's proxy forwards requests to http://localhost:5000.
 *   This prevents mobile browsers from attempting to connect to 'localhost' on the phone!
 */

export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL;

  // Remote production backend (e.g. Render, AWS, Heroku)
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl.replace(/\/$/, '');
  }

  // In local development, use relative path so Vite dev server proxies /api to port 5000.
  // This allows mobile devices on the same Wi-Fi (e.g. http://192.168.x.x:3000) to connect seamlessly.
  if (import.meta.env.DEV) {
    return '';
  }

  // If accessed from a mobile/network IP without a remote backend configured
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '';
  }

  return (envUrl || 'http://localhost:5000').replace(/\/$/, '');
}

export const API_BASE_URL = getApiBaseUrl();

/**
 * Build absolute or proxy-relative API endpoint URL.
 */
export function getApiUrl(endpoint) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const baseUrl = getApiBaseUrl();
  return baseUrl ? `${baseUrl}${cleanEndpoint}` : cleanEndpoint;
}

/**
 * Fetch courses from backend with optional filters.
 */
export async function apiGetCourses({ category, level, search } = {}) {
  const params = new URLSearchParams();
  if (category && category !== 'All' && category !== 'All Courses') {
    params.append('category', category);
  }
  if (level && level !== 'All Levels') {
    params.append('level', level.toLowerCase());
  }
  if (search && search.trim()) {
    params.append('search', search.trim());
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await fetch(getApiUrl(`/api/courses${queryString}`), {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch courses: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch single course by slug.
 */
export async function apiGetCourseBySlug(slug) {
  const response = await fetch(getApiUrl(`/api/courses/${slug}`), {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch course: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Submit candidate admission inquiry.
 */
export async function apiSubmitAdmission(payload) {
  const response = await fetch(getApiUrl('/api/admissions'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || data.details?.[0] || 'Failed to submit admission inquiry.';
    throw new Error(errorMsg);
  }

  return data;
}

/**
 * Submit general contact inquiry.
 */
export async function apiSubmitContact(payload) {
  const response = await fetch(getApiUrl('/api/contact'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || data.details?.[0] || 'Failed to submit contact message.';
    throw new Error(errorMsg);
  }

  return data;
}

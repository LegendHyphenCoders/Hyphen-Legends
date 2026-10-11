/**
 * Centralized API Client Configuration for HL Stack.
 * Resolves base URL from Vite environment variable (VITE_API_URL).
 * Defaults to http://localhost:5000 in local development.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Build absolute API endpoint URL.
 */
export function getApiUrl(endpoint) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL.replace(/\/$/, '')}${cleanEndpoint}`;
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

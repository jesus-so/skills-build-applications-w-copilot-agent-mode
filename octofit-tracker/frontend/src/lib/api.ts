// Vite env: define VITE_CODESPACE_NAME in .env.local when using Codespaces preview.
// Example .env.local:
//   VITE_CODESPACE_NAME=my-codespace-name
// If unset, the code falls back to localhost to avoid building undefined URLs.
const CODESPACE = import.meta.env.VITE_CODESPACE_NAME as string | undefined;

const API_BASE = CODESPACE && CODESPACE.length > 0
  ? `https://${CODESPACE}-8000.app.github.dev/api`
  : `http://localhost:8000/api`;

export function apiUrl(resource: string) {
  return `${API_BASE}/${resource}`;
}

export function parseListResponse<T>(body: any): T[] {
  // handle paginated responses, { data: [...] } or { items: [...] } or direct arrays
  if (!body) return [];
  if (Array.isArray(body)) return body;
  if (Array.isArray(body.data)) return body.data;
  if (Array.isArray(body.items)) return body.items;
  // handle wrapped { users: [...] }
  const keys = Object.keys(body);
  for (const k of keys) {
    if (Array.isArray((body as any)[k])) return (body as any)[k];
  }
  return [];
}

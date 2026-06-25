import { useEffect, useState } from 'react';

const CODESPACE = import.meta.env.VITE_CODESPACE_NAME as string | undefined;
const API_BASE = CODESPACE && CODESPACE.length > 0
  ? `https://${CODESPACE}-8000.app.github.dev/api`
  : `http://localhost:8000/api`;

function parseListResponse<T>(body: any): T[] {
  if (!body) return [];
  if (Array.isArray(body)) return body;
  if (Array.isArray(body.data)) return body.data;
  if (Array.isArray(body.items)) return body.items;
  const keys = Object.keys(body || {});
  for (const k of keys) {
    if (Array.isArray((body as any)[k])) return (body as any)[k];
  }
  return [];
}

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/activities`)
      .then((r) => r.json())
      .then((body) => setActivities(parseListResponse(body.activities ?? body)))
      .catch(() => setActivities([]));
  }, []);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((a) => (
          <li key={a._id || a.id}>
            {a.type} — {a.distanceKm ?? a.durationMin ?? ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

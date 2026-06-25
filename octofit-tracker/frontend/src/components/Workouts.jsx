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

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/workouts`)
      .then((r) => r.json())
      .then((body) => setWorkouts(parseListResponse(body.workouts ?? body)))
      .catch(() => setWorkouts([]));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((w) => (
          <li key={w._id || w.id}>{w.title}</li>
        ))}
      </ul>
    </div>
  );
}

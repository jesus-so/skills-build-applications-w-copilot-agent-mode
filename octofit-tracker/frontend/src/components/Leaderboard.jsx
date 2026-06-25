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

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard`)
      .then((r) => r.json())
      .then((body) => setEntries(parseListResponse(body.leaderboard ?? body)))
      .catch(() => setEntries([]));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {entries.map((e) => (
          <li key={e._id || e.id}>{e.user?.name ?? e.user ?? JSON.stringify(e)}</li>
        ))}
      </ol>
    </div>
  );
}

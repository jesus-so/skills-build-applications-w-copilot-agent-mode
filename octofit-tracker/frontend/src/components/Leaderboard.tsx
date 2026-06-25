import { useEffect, useState } from 'react';
import { apiUrl, parseListResponse } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    fetch(apiUrl('leaderboard'))
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

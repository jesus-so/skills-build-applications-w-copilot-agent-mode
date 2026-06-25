import { useEffect, useState } from 'react';
import { apiUrl, parseListResponse } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    fetch(apiUrl('teams'))
      .then((r) => r.json())
      .then((body) => setTeams(parseListResponse(body.teams ?? body)))
      .catch(() => setTeams([]));
  }, []);

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((t) => (
          <li key={t._id || t.id}>{t.name}</li>
        ))}
      </ul>
    </div>
  );
}

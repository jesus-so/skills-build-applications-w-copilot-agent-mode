import { useEffect, useState } from 'react';
import { apiUrl, parseListResponse } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    fetch(apiUrl('activities'))
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

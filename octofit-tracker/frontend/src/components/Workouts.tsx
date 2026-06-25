import { useEffect, useState } from 'react';
import { apiUrl, parseListResponse } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);

  useEffect(() => {
    fetch(apiUrl('workouts'))
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

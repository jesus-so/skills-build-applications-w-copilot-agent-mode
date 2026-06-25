import { useEffect, useState } from 'react';
import { apiUrl, parseListResponse } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetch(apiUrl('users'))
      .then((r) => r.json())
      .then((body) => setUsers(parseListResponse(body.users ?? body)))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((u) => (
          <li key={u._id || u.id}>{u.name ?? u.email ?? JSON.stringify(u)}</li>
        ))}
      </ul>
    </div>
  );
}

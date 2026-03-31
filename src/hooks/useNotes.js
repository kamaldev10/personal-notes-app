import { useCallback, useState } from "react";

// Hook to manage notes list with loading + error
export function useNotes(fetchFn) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { error: err, data } = await fetchFn();
    if (err) setError("Gagal memuat catatan");
    else setNotes(data || []);
    setLoading(false);
  }, [fetchFn]);

  return { notes, loading, error, loadNotes, setNotes };
}

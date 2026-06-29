import axios from "axios";
import { useEffect, useState } from "react";

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const Controller = new AbortController();
    const { signal } = Controller;
    setLoading(true);
    axios
      .get<{ meals: T[] }>(url, { signal })
      .then(({data}) => {
        if (!ignore) {
          setData(data.meals);
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        throw e;
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

      return () => {
        ignore = true;
        Controller.abort();
      };
  }, [url]);

  return { loading, data, setData, setLoading };
}

import axios from "axios";
import { useState } from "react";

export default <T>() => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  const fetch = async (url: string) => {
    setLoading(true);
    axios.get<{ meals: T[] }>(url)
      .then(({ data }) => {
        setData(data.meals[0]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, fetch };
}

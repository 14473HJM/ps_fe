import { useEffect, useState } from "react";
import axios from 'axios';

const usePost = (url, body) => {
  const [data, setdata] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (url && body) {
      setloading(true);
      axios.post(url, body)
        .then(res => {
          setdata(res.data)
          seterror(null)
        })
        .catch(e => {
          setdata(null)
          seterror(true)
        })
        .finally(() => {
          setloading(false)
        })
    }
  }, [url, body]);

  return { data, loading, error };
};

export default usePost;

import { useState } from 'react';

function useHttpRequest() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (
    url,
    method = 'GET',
    body = null,
    headers = {}
  ) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });

      const responseData = await response.json();

      if (response.status !== 200) {
        setError(responseData.errorMessage);
      } else {
        setData(responseData);
      }
    } catch (error) {
      setError(error.message || 'Something failed.');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    sendRequest,
  };
}

export default useHttpRequest;

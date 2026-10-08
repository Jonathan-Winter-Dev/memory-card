import { useEffect, useState } from "react";

export default function ApiImage() {
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(`https://picsum.photos/400`);
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        setUrl(response.url);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchImage();
  }, []);
  return <img src={url} alt="" />;
}

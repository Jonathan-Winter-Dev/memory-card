import { useEffect, useState } from "react";

const apiKey: string = "pukzIEaxPmsxN8btWdH6GILpUm1l7UgF";

type ApiImageProps = {
  name: string;
};

export default function ApiImage({ name }: ApiImageProps) {
  const [url, setUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(
          `http://api.giphy.com/v1/gifs/search?q=${name}&api_key=${apiKey}&limit=1`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const jsonResponse = await response.json();

        setUrl(jsonResponse.data[0].images.fixed_height_still.url);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }

    fetchImage();
  }, [name]);
  return <img src={url} alt="" />;
}

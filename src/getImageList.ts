export default async function getImageList(
  numberOfImages: number,
): Promise<Set<string> | undefined> {
  const imageSet = new Set<string>();
  try {
    for (let i = 0; i < numberOfImages; i++) {
      let found: boolean = false;
      while (!found) {
        const response = await fetch(`https://picsum.photos/400`);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        if (!imageSet.has(response.url)) {
          imageSet.add(response.url);
          found = true;
        }
      }
    }
    return imageSet;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return undefined;
  }
}

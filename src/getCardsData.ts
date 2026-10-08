import CardData from "./cardData";
import getImageList from "./getImageList";

export default async function getCardsData(
  amountOfCards: number,
): Promise<CardData[]> {
  let cardDataArr: CardData[] = [];
  const imageList = await getImageList(amountOfCards);

  if (imageList !== undefined) {
    const imageListArr = Array.from(imageList);
    cardDataArr = imageListArr.map((image) => new CardData(image));
  }

  return cardDataArr;
}

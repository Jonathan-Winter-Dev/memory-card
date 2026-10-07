import Card from "./Card";
import CardData from "./cardData";
import { useEffect, useState } from "react";

const cardOne: CardData = new CardData("Jon");
const cardTwo: CardData = new CardData("Bob");
const cardThree: CardData = new CardData("Cheese");

function shuffleArray(array: CardData[]): CardData[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export default function App() {
  const [cardArr, setCardArr] = useState<CardData[]>([
    cardOne,
    cardTwo,
    cardThree,
  ]);

  function handleCardClick(id: string) {
    setCardArr(
      cardArr.map((item) => {
        if (id === item.id) {
          return { ...item, beenSelected: true };
        } else {
          return item;
        }
      }),
    );
  }

  const cards = cardArr.map((card) => (
    <Card
      name={card.name}
      onClick={handleCardClick}
      id={card.id}
      key={card.id}
      beenSelected={card.beenSelected}
    />
  ));

  return <div className="">{cards}</div>;
}

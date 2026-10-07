import Card from "./Card";
import CardData from "./cardData";
import { useEffect, useState } from "react";

const cardOne: CardData = new CardData("Jon");
const cardTwo: CardData = new CardData("Adeline");
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

  const [currentScore, setCurrentScore] = useState<number>(0);

  useEffect(() => {
    shuffleCardArr();
  }, []);

  function shuffleCardArr() {
    setCardArr(shuffleArray(structuredClone(cardArr)));
  }

  function resetGame() {
    setCardArr(
      cardArr.map((card) => {
        return { ...card, beenSelected: false };
      }),
    );

    setCurrentScore(0);
  }

  function handleCardClick(id: string) {
    const card = cardArr.find((item) => item.id === id);

    if (!card) throw new Error(`Card with ID ${id} not found.`);

    console.log(card);

    if (card.beenSelected) {
      resetGame();
      return;
    }

    setCurrentScore(currentScore + 1);

    const newCardArr = cardArr.map((item) => {
      if (id === item.id) {
        return { ...item, beenSelected: true };
      } else {
        return item;
      }
    });

    setCardArr(shuffleArray(newCardArr));
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

  return (
    <div className="">
      <div className="scoreContainer">{`Current Score: ${currentScore}`}</div>
      <div className="cardsContainer">{cards}</div>
    </div>
  );
}

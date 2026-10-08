import Card from "./Card";
import CardData from "./cardData";
import { useEffect, useState } from "react";
import shuffleArray from "./utils/shuffleArray";
import ScoreDisplay from "./Score";
import getCardsData from "./getCardsData";

const NUMBER_OF_CARDS_TO_BE_MADE: number = 10;

const cardDataArr = await getCardsData(NUMBER_OF_CARDS_TO_BE_MADE);

function hasWonGame(score: number, maxScore: number): boolean {
  return score >= maxScore;
}

function createCardData(): CardData[] {
  const arr: CardData[] = [];
  for (let i = 0; i < 10; i++) {
    arr.push(new CardData());
  }

  return arr;
}

export default function App() {
  const [cardArr, setCardArr] = useState<CardData[]>(cardDataArr);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  // Shuffle cards on load
  useEffect(() => {
    setCardArr(shuffleArray(structuredClone(cardArr)));
  }, []);

  function resetGame() {
    const newCardArr = cardArr.map((card) => {
      return { ...card, beenSelected: false };
    });

    setCardArr(shuffleArray(newCardArr));

    setCurrentScore(0);
  }

  function handleCardClick(id: string) {
    const card = cardArr.find((item) => item.id === id);

    if (!card) throw new Error(`Card with ID ${id} not found.`);

    if (card.beenSelected) {
      resetGame();
      return;
    }

    setCurrentScore(currentScore + 1);

    if (hasWonGame(currentScore + 1, cardArr.length)) {
      alert("Won big boy");
      setHighScore(highScore + 1);
      resetGame();
      return;
    }

    if (currentScore >= highScore) setHighScore(highScore + 1);

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
      imagePath={card.imageSrc}
      onClick={handleCardClick}
      id={card.id}
      key={card.id}
      beenSelected={card.beenSelected}
    />
  ));

  return (
    <div className="">
      <div className="scoreContainer">
        <ScoreDisplay score={currentScore} type="Current" />
        <ScoreDisplay score={highScore} type="High" />
      </div>
      <div className="cardsContainer">{cards}</div>
    </div>
  );
}

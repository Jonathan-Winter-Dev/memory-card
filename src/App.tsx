import Card from "./Card";
import CardData from "./cardData";
import { useEffect, useState } from "react";
import shuffleArray from "./utils/shuffleArray";
import ScoreDisplay from "./Score";
import getCardsData from "./getCardsData";
import logo from "./assets/memory-icon.svg";

const NUMBER_OF_CARDS_TO_BE_MADE: number = 12;

function hasWonGame(score: number, maxScore: number): boolean {
  return score >= maxScore;
}

export default function App() {
  const [cardArr, setCardArr] = useState<CardData[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [clickEnabled, setClickEnabled] = useState<boolean>(true);

  useEffect(() => {
    async function loadCards() {
      const cards = await getCardsData(NUMBER_OF_CARDS_TO_BE_MADE);
      setCardArr(shuffleArray(cards));
      setLoading(false);
    }

    loadCards();
  }, []);

  function resetGame() {
    const newCardArr = cardArr.map((card) => {
      return { ...card, beenSelected: false };
    });

    setCardArr(shuffleArray(newCardArr));

    setCurrentScore(0);
  }

  function handleCardClick(id: string) {
    if (!clickEnabled) return;
    setClickEnabled(false);

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
    setClickEnabled(true);
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
    <>
      <div className="scoreContainer">
        <ScoreDisplay score={currentScore} type="Current" />
        <div className="titleContainer">
          <h1>Memory Trainer</h1>
          <img src={logo} role="image" alt="memory game icon" />
        </div>
        <ScoreDisplay score={highScore} type="High" />
      </div>
      <div className="cardsContainer">
        {loading ? <h1>Loading...</h1> : cards}
      </div>
    </>
  );
}

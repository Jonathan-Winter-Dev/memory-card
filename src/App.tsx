import Card from "./Card";
import CardData from "./cardData";

const cardOne: CardData = new CardData("Jon");

export default function App() {
  return <Card cardData={cardOne} />;
}

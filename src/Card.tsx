import CardData from "./cardData";
import ApiImage from "./ApiImage";

type CardProps = {
  cardData: CardData;
};

export default function Card({ cardData }: CardProps) {
  return (
    <div className="card" key={cardData.id}>
      <ApiImage name={cardData.name} />
      <h1>{cardData.name}</h1>
    </div>
  );
}

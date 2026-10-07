import ApiImage from "./ApiImage";

type CardProps = {
  name: string;
  id: string;
  beenSelected: boolean;
  onClick: (id: string) => void;
};

export default function Card({ name, id, onClick, beenSelected }: CardProps) {
  return (
    <div
      className={`card ${beenSelected ? `selected` : ""}`}
      data-id={id}
      onClick={() => onClick(id)}
    >
      <ApiImage name={name} />
      <h1>{name}</h1>
    </div>
  );
}

type CardProps = {
  imagePath: string;
  id: string;
  beenSelected: boolean;
  onClick: (id: string) => void;
};

export default function Card({
  imagePath,
  id,
  onClick,
  beenSelected,
}: CardProps) {
  return (
    <div
      className={`card ${beenSelected ? `beenSelected` : ""}`}
      data-id={id}
      onClick={() => onClick(id)}
    >
      <img src={imagePath} alt="" />
    </div>
  );
}

type ScoreProps = {
  score: number;
  type: string;
};
export default function ScoreDisplay({ score, type }: ScoreProps) {
  return <h3>{`${type}: ${score}`}</h3>;
}

type ScoreProps = {
  score: number;
  type: string;
};
export default function ScoreDisplay({ score, type }: ScoreProps) {
  return <h2>{`${type}: ${score}`}</h2>;
}

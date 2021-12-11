import Card from "./Card";

export default function Board({ cardNums, visibility, isClick, clickHandler }) {
  return (
    <div className="board">
      {cardNums.map((card, i) => (
        <Card
          key={i}
          cardNums={cardNums}
          visibility={visibility}
          isClick={isClick}
          clickHandler={clickHandler}
          card={card}
          i={i}
        />
      ))}
    </div>
  );
}

export default function Card({ visibility, isClick, clickHandler, card, i }) {
  return (
    <div
      className="card"
      style={{
        visibility: visibility[i],
        backgroundColor: "blueviolet",
      }}
      onClick={() => clickHandler(card, i)}
    >
      {isClick[i] ? card : null}
    </div>
  );
}

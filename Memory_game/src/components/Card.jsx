export default function Card({ visibility, isClick, clickHandler, card, i,pointerEvents }) {
  return (
    <div
      className="card"
      style={{
        visibility: visibility[i],
        pointerEvents: pointerEvents
        
      }}
      onClick={() => clickHandler(i)}
    >
      <div>{isClick[i] ? card : null}</div>
      
    </div>
  );
}

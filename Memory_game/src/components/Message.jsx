export default function Message({isNewGame,isGameOver,playerMoves,clockTimer}) {
  return (
    <div>
      <div>
        {isNewGame ? (
          <div>
            your time : {clockTimer} sec
            <br />
            number of moves : {playerMoves}
          </div>
        ) : null}
        {<h1>{isGameOver ? "game over" : null}</h1>}
      </div>
    </div>
  );
}

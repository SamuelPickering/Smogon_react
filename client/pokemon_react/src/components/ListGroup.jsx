import allMoves from "../data/allUsedMoves.json"
import allAbilites from "../data/allUsedAbilites.json"


function ListGroup(moves) {

    const things = [
        "ShadowBall",
        "Sans",
        "Freddy Fazbear"
    ]
    console.log(moves)
    return  ( 
        
     <>
     <h1>Title</h1>
    <ul className="list-group">
        {console.log(allMoves)}
        {Object.keys(moves.moves)
        .sort((a, b) => moves.moves[b] - moves.moves[a])
        .map((move) => move !== "other" &&  (
            <li key={move} className="list-group-item">{move !== "other" ? allMoves[move].display : "other"} <button>Normal</button>, {moves.moves[move]}%</li>
        ))}
        <li className="list-group-item">Other {moves.moves.other}%</li>
  </ul>
  </> )
}

export default ListGroup
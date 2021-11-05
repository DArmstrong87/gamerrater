import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { getGames } from "./GameManager"

export const GameList = () => {

    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(games => setGames(games))
    }, [])

    return (<>

        <h2>Games</h2>
        <button onClick={() =>
            history.push("/games/new")
        }>Create Game</button>
        <ul>

            {games.map(game => {
                return <li><Link to={`/games/${game.id}`}>{game.title}</Link></li>
            })}
        </ul>
    </>)
}
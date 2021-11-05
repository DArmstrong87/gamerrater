import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getGame } from "./GameManager";

export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState([])

    useEffect(() => {
        getGame(gameId)
            .then(game => setGame(game))
    }, [gameId])

    return (<>
        <h2>{game.title}</h2>
        <p>Designer: {game.designer}</p>
        <p>Year released: {game.year_released}</p>
        <p>Number of players: {game.num_players}</p>
        <p>Estimated time to play: {game.time_to_play}</p>
        <p>Age recommendation: {game.age}</p>
        <p>Categories: {game.categories?.map(category => {
                return category.label
            }).join(", ")}</p>
    </>)
}
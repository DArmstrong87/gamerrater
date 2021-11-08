import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getGame, getReviews } from "./GameManager";

export const GameDetails = () => {
    const { gameId } = useParams()
    const [game, setGame] = useState([])
    const [reviews, setReviews] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGame(gameId)
            .then(game => setGame(game))
        getReviews(gameId)
            .then(reviews => setReviews(reviews))
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
        <h3>Reviews</h3>
        {reviews.length === 0 ? `Be the first to write a review of ${game.title}!` : ""}
        {reviews?.map(review => {
            return <p>
                "{review.review}" by <u>{review.player.user.first_name} {review.player.user.last_name}</u>
            </p>
        })}
        <p>
            <button onClick={() => history.push(`/games/${game.id}/review`)}>
                Write a review</button>
        </p>
    </>)
}
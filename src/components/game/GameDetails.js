import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getGame, getReviews } from "./GameManager";
import "./GameDetails.css"

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

        <div className="avgRating">Avg rating: <b>{game.average_rating}</b></div>
        <div>Designer: {game.designer}</div>
        <div>Year released: {game.year_released}</div>
        <div>Number of players: {game.num_players}</div>
        <div>Estimated time to play: {game.time_to_play}</div>
        <div>Age recommendation: {game.age}</div>
        <div>Categories: {game.categories?.map(category => {
            return category.label
        }).join(", ")}</div>

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
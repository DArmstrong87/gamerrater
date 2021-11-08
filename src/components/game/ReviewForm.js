import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { createRating, createReview, getGame } from "./GameManager";

export const ReviewForm = () => {
    const [game, setGame] = useState([])
    const { gameId } = useParams()
    const [review, setReview] = useState("")
    const [rating, setRating] = useState(0)
    const history = useHistory()

    useEffect(() => {
        getGame(gameId).then(game => setGame(game))
    }, [gameId])

    const oneToTen = () => {
        let array = []
        for (let i = 1; i < 11; i++) array.push(i)
        return array
    }
    const ratings = oneToTen()

    const submitReview = () => {
        const d = new Date();
        const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

        const newReview = {
            gameId: parseInt(gameId),
            review: review,
            date: date,
        }
        const newRating = {
            gameId: parseInt(gameId),
            rating: rating
        }
        createRating(newRating)
            .then(() => {
                createReview(newReview)
                    .then(history.push(`/games/${gameId}`))
            })
    }


    return (<>
        <h2>Review {game.title}</h2>

        <label htmlFor="rating">Rate this game: </label>
        <select name="rating" defaultValue={0}
            onChange={(e) => setRating(e.target.value)}>
            <option value={0} disabled>Rating</option>
            {ratings.map(num => {
                return <option value={num}>{num}</option>
            })}
        </select>

        <p>
            <textarea cols="50" rows="10" onChange={(event) => setReview(event.target.value)} />
        </p>
        <p>
            <button onClick={submitReview}>Submit Review</button>
        </p>
    </>)
}
import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getCategories, getGame, updateGame } from "./GameManager"

export const GameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])
    const { gameId } = useParams()
    const [currentGame, setCurrentGame] = useState({
        categories: []
    })

    console.log(currentGame)
    useEffect(() => {
        getCategories()
            .then(cats => setCategories(cats))
        if (gameId) {
            getGame(gameId)
                .then(game => setUpdatedGame(game))
        }
    }, [gameId])

    const setUpdatedGame = (game) => {
        const categories = game.categories
        game.categories = []
        for (const category of categories) {
            game.categories.push(category.id)
        }
        setCurrentGame(game)
    }

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        // If it's a category checkbox and the current array includes the ID that was checked, then remove it from the array.
        if (event.target.name === "categories" && newGameState.categories.includes(parseInt(event.target.value))) {
            const index = newGameState.categories.indexOf(parseInt(event.target.value))
            newGameState[event.target.name].splice(index, 1)
        }
        // If it's a category checkbox, add the ID to the array.
        else if (event.target.name === "categories") {
            newGameState[event.target.name].push(parseInt(event.target.value))
        }
        else { // If it's not a category checkbox, set the key:value pair.
            newGameState[event.target.name] = event.target.value
        }
        setCurrentGame(newGameState)
    }

    const handleSubmit = (game) => {
        // If there is a gameId, update that game. If not, create one.
        if (gameId) {
            updateGame(game, gameId)
                .then(() => history.push("/games"))
        } else {
            createGame(game)
                .then(() => history.push("/games"))
        }
    }


    return (<>

        <form className="gameForm">
            <h2 className="gameForm__title">
                {gameId ? "Edit Game" : "Register New Game"}
            </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="number" name="year_released" required autoFocus className="form-control"
                        value={currentGame.year_released}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="num_players">Number of Players: </label>
                    <input type="number" name="num_players" required autoFocus className="form-control"
                        value={currentGame.num_players}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time_to_play">Time to Play: </label>
                    <input type="number" name="time_to_play" required autoFocus className="form-control"
                        value={currentGame.time_to_play}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age: </label>
                    <input type="number" name="age" required autoFocus className="form-control"
                        value={currentGame.age}
                        onChange={changeGameState}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="maker">Categories: </label>
                    {
                        categories.map(category => {
                            return <>
                                <input type="checkbox" name="categories" value={category.id} checked={
                                    currentGame.categories.includes(category.id)}
                                    onChange={changeGameState} />
                                <label htmlFor="category">{category.label}</label>
                            </>
                        })
                    }
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        year_released: parseInt(currentGame.year_released),
                        num_players: parseInt(currentGame.num_players),
                        time_to_play: parseInt(currentGame.time_to_play),
                        age: parseInt(currentGame.age),
                        categories: currentGame.categories
                    }

                    handleSubmit(game)
                }}
                className="btn icon-create">🌟 {gameId ? "Update" : "Create"}
            </button>
        </form>
    </>)
}

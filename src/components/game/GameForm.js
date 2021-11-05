import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getCategories } from "./GameManager"

export const GameForm = () => {
    const history = useHistory()
    const [categories, setCategories] = useState([])

    const [currentGame, setCurrentGame] = useState({
        title: "Scrabble",
        description: "Words and stuff",
        designer: "Hasbro",
        year_released: "1935",
        num_players: 4,
        time_to_play: 60,
        age: 5,
        categories: []
    })
    console.log(currentGame)

    const changeGameState = (event) => {
        const newGameState = { ...currentGame }
        if (event.target.name === "categories" && newGameState.categories.includes(parseInt(event.target.value))) {
            const index = newGameState.categories.indexOf(parseInt(event.target.value))
            newGameState[event.target.name].splice(index, 1)
        }
        else if (event.target.name === "categories") {
            newGameState[event.target.name].push(parseInt(event.target.value))
        }
        else {
            newGameState[event.target.name] = event.target.value
        }
        setCurrentGame(newGameState)
    }

    useEffect(() => {
        getCategories()
            .then(cats => setCategories(cats))
    }, [])

    return (<>

        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
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

                {/* SINGLE CATEGORY FROM DROPDOWN */}
                {/* <div className="form-group">
                    <label htmlFor="categories">categories: </label>
                    <select type="text" name="categories" required autoFocus className="form-control"
                        value={currentGame.categories}
                        onChange={changeGameState}
                    >
                        <option disabled value={0}>Select categories</option>
                        {categories.map(categories => {
                            return <option value={categories.id}>{categories.label}</option>
                        })}
                    </select>
                </div> */}

                <div className="form-group">
                    <label htmlFor="maker">categories: </label>
                    {
                        categories.map(category => {
                            return <>
                                <input type="checkbox" name="categories" value={category.id}
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

                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn icon-create">🌟Create</button>
        </form>
    </>)
}

import React from "react"
import { Route } from "react-router-dom"
import { GameDetails } from "./components/game/GameDetails"
import { GameForm } from "./components/game/GameForm"
import { GameList } from "./components/game/GameList"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>

        </main>
    </>
}
export const getGames = () => {
    return fetch('http://localhost:8000/games', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}

export const getGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}


export const getCategories = () => {
    return fetch('http://localhost:8000/categories', {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(res => res.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
}

export const createReview = (newReview) => {
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    })
        .then(response => {
            if (response.ok) {
                response.json()
            }
        }
        )
}

export const getReviews = (gameId) => {
    return fetch(`http://localhost:8000/reviews?gameId=${gameId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        },
    })
        .then(res => res.json())
}
import "./App.css"
// const fetch = require("node-fetch")
import React, { useState, useEffect } from "react"
import CardContainer from "./components/CardContainer"
import getRandomInt from "./components/getRandomInt"

function App() {
	let [gameInProgress, setGameInProgress] = useState(true)
	let [berryArr, setBerryArr] = useState([])
	let [clickedArr, setClickedArr] = useState([])
	let [correctCount, setCorrectCount] = useState(0)

	let initializeGame = () => {
		setBerryArr((berryArr = []))
		setClickedArr((clickedArr = []))
		setCorrectCount(0)
		generateBerryArray(3)
		setGameInProgress(true)
	}

	let randomizePlacement = (array) => {
		let newArray = array
			.map((item) => ({
				item,
				sort: Math.random(),
			}))
			.sort((a, b) => a.sort - b.sort)
			.map(({ item }) => item)

		return newArray
	}

	let handleCardClick = (item) => {
		setBerryArr(randomizePlacement(berryArr))

		if (!clickedArr.includes(item)) {
			setClickedArr((clickedArr = clickedArr.concat(item)))
			setCorrectCount(correctCount + 1)

			if (
				berryArr.every((item) => {
					return clickedArr.includes(item)
				})
			) {
				setBerryArr((berryArr = []))
				generateBerryArray(clickedArr.length + 1)
			}
		} else {
			setGameInProgress(false)
		}
	}

	let generateBerryArray = async (amount) => {
		for (let i = 0; i < amount; i++) {
			let id = getRandomInt(1, 65)
			let berry = await getBerry(id)
			setBerryArr((berryArr = berryArr.concat(berry)))
		}
	}

	//can go to 64
	let getBerry = async (id) => {
		let response = await fetch(`https://pokeapi.co/api/v2/berry/${id}/`)
		let berryData = await response.json()

		return berryData.name
	}

	useEffect(() => {
		generateBerryArray(3)
	}, [])

	return (
		<div className="App">
			<div className="header">
				<h1 className="title">memory game</h1>
				<p>Don't guess the same berry twice! There are 64 in total.</p>
			</div>

			<CardContainer
				gameInProgress={gameInProgress}
				berryArr={berryArr}
				handleCardClick={handleCardClick}
				initializeGame={initializeGame}
			/>
			<div className="score">{correctCount}</div>
		</div>
	)
}

export default App

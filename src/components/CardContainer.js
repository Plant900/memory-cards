import React, { useState, useEffect } from "react"
import Card from "./Card"

function CardContainer(props) {
	let { gameInProgress, berryArr, handleCardClick, initializeGame } = props

	if (!gameInProgress) {
		return (
			<div>
				<button onClick={initializeGame}>Restart</button>
			</div>
		)
	} else {
		return (
			<div className="CardContainer">
				{berryArr.map((item) => {
					return (
						<Card item={item} handleCardClick={handleCardClick} />
					)
				})}
			</div>
		)
	}
}

export default CardContainer

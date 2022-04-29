import React, { useState, useEffect } from "react"

function Card(props) {
	return (
		<div>
			<div
				onClick={() => props.handleCardClick(props.item)}
				className="Card"
			>
				<img
					src={`https://github.com/PokeAPI/sprites/blob/master/sprites/items/berries/${props.item}-berry.png?raw=true`}
				/>
				{props.item}
			</div>
		</div>
	)
}

export default Card

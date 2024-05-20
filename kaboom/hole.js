import kaboom from "kaboom"

kaboom()

setBackground(220, 220, 220)

loadSprite("dino", "sprites/dino.png");

scene("game", () => {

	const PIPE_OPEN = 240
	const PIPE_MIN = 60
	const JUMP_FORCE = 800
	const SPEED = 500
	let BLOCK_SPEED = 500
	const CEILING = -60

const dino = add([
	sprite("dino"),
	pos(center()),
	area(),
	scale(.2),
	body(),
])

onKeyDown("left", () => {
	dino.move(-SPEED, 0)
})

onKeyDown("right", () => {
	dino.move(SPEED, 0)
})

onKeyDown("up", () => {
	dino.move(0, -SPEED)
})

onKeyDown("down", () => {
	dino.move(0, SPEED)
})

	function spawnPipe() {

		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
		const h2 = height() - h1 - PIPE_OPEN

		add([
			pos(width(), 0),
			rect(64, h1),
			color(rand(255), rand(255), rand(255)),
			outline(4),
			area(),
			move(LEFT, BLOCK_SPEED),
			offscreen({ destroy: true }),
			"pipe",
		])

		add([
			pos(width(), h1 + PIPE_OPEN),
			rect(64, h2),
			color(rand(255), rand(255), rand(255)),
			outline(4),
			area(),
			move(LEFT, BLOCK_SPEED),
			offscreen({ destroy: true }),
			"pipe",
			{ passed: false },
		])

	}


	onUpdate("pipe", (p) => {
		if (p.pos.x + p.width <= dino.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	dino.onCollide("pipe", () => {
		go("gameOver", score)
		addKaboom(dino.pos)
	})

	onUpdate("pipe", (p) => {
		if (p.pos.x + p.width <= dino.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	loop(.75, () => {
		spawnPipe()
	})

	let score = 0

	const scoreLabel = add([
		text(score),
		anchor("center"),
		pos(width() / 2, 80),
		fixed(),
		z(100),
	])

	function addScore() {
		score++
		scoreLabel.text = score
		// play("score")
		BLOCK_SPEED += 10
	}

})

scene("gameOver", (score) => {

add([
	text("GAME OVER", 48),
	pos(center().x, center().y - 50),
	anchor("center"),
	color(255, 0, 0),
])

add([
	text("Press any key or click the mouse to restart", 32),
	pos(center().x, center().y + 70),
	anchor("center"),
	color(0, 0, 0),
])

add([
	text(`Score: ${score}`, 32),
	pos(center().x, center().y + 10),
	anchor("center"),
	color(255, 255, 255),
])

onKeyPress("space", () => go("game"))
onClick(() => go("game"))

})

go("game")



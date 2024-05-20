import kaboom from "kaboom"

kaboom()

setBackground(255, 255, 255)

loadSprite("dino", "/sprites/dino.png");
// loadSound("score", "/examples/sounds/score.mp3")

scene("game", () => {

	const PIPE_OPEN = 240
	const PIPE_MIN = 60
	const JUMP_FORCE = 800
	const SPEED = 500
	const BLOCK_SPEED = 500
	const CEILING = -60

const dino = add([
	sprite("dino"),
	pos(center()),
	area(),
	scale(),
	body(),
	layer("game"),
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

	// callback when bean onCollide with objects with tag "pipe"
	dino.onCollide("pipe", () => {
		go("lose", score)
		// play("hit")
		addKaboom(dino.pos)
	})

	// per frame event for all objects with tag 'pipe'
	onUpdate("pipe", (p) => {
		// check if bean passed the pipe
		if (p.pos.x + p.width <= dino.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	loop(2, () => {
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
	}

})

scene("lose", (score) => {

	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})

go("game")


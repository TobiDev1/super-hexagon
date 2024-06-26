const canvas = document.getElementById('canvas'),
	scoreHTML = document.getElementById('scoreText'),
	height = 400,
	width = 600,
	center = [width / 2, height / 2];
let player,
	difficulty = 1,
	font,
	bgColor,
	mainColor,
	score = 0,
	hexagonSpawn,
	firstGame = true,
	gameOver = true;

function preload() {
	font = loadFont('assets/Jersey10.ttf');
}

function restartGame() {
	player = new Player(0);
	hexagons = [];
	score = 0;
	difficulty = 2;
	hexagonSpawn = new HexagonSpawn(difficulty);
}

function setColors() {
	let color_index = Math.floor(score / 5) % 6;
	mainColor = COLORS[color_index].main;
	bgColor = COLORS[color_index].background;
}

function setup() {
	setColors();
	createCanvas(width, height, canvas);
	restartGame();
}

function draw() {
	if (!gameOver) {
		background(bgColor + '3C');
		fill(mainColor);
		noStroke();

		beginShape();
		for (let i = 0; i < 7; i++) {
			let newAngle = ((2 * Math.PI) / 6) * i;
			let x = 20 * Math.cos(newAngle);
			let y = 20 * Math.sin(newAngle) * -1;
			vertex(center[0] + x, center[1] + y);
		}
		endShape();

		player.draw();
		if (keyIsDown(DOWN_ARROW)) {
			player.rotate(-1);
		}
		if (keyIsDown(UP_ARROW)) {
			player.rotate(1);
		}

		hexagonSpawn.draw();
	} else {
		// Key 32 is Spacebar
		if (keyIsDown(32)) {
			firstGame = false;
			gameOver = false;
			restartGame();
		}

		background(bgColor + '20');
		let fillOpacity = frameCount % 50 < 10 ? '00' : '88';
		fill('#FFFFFF' + fillOpacity);
		noStroke();
		textFont(font);
		textAlign(CENTER);
		textSize(25);
		let scoreText = firstGame ? '' : 'SCORE: ' + score;
		text(scoreText, center[0], center[1] - 50);
		text('MAX SCORE: ' + '100', center[0], center[1] - 10);
		let screenText = firstGame
			? 'PRESS "SPACE" TO START'
			: 'PRESS "SPACE" TO RESTART';
		textSize(50);
		text(screenText, center[0], center[1] + 75);
	}
}

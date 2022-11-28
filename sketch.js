const cellSize = 100, gap =10, radius = 100;
let numOfCols, numOfRows, canvas, playing;
let margin = {x: null, y: null};
let centerPoints = [];

function windowResized() {
  resizeCanvas(1000,700);
	setup();
	draw();
}

function setup() {
	canvas = createCanvas(1200,700);
	colorMode(HSL);
	background(0,0,0);
	frameRate(5);
	centerPoints = [];
	getMargin();
	getCenterPoint();
	playing = true;
}

function draw() {
	background(0,0,0, 0.1);
	drawCircles();
}

function mousePressed(){
	if(playing){
		noLoop()
		playing = false;
	}else{
		loop();
		playing = true;
	}
}

function getMargin() {
    numOfCols = Math.floor(canvas.width / (cellSize + gap));
    const totalMarginX = canvas.width - ((cellSize + gap) * numOfCols - gap);
    margin.x = Math.floor(totalMarginX / 2);
    numOfRows = Math.floor(canvas.height / (cellSize + gap));
    const totalMarginY = canvas.height - ((cellSize + gap) * numOfRows - gap);
    margin.y = Math.floor(totalMarginY / 2);
}

function getCenterPoint() {
    for (let i = 0; i < numOfRows; i++) {
        for (let j = 0; j < numOfCols; j++) {
            let cp = {};
            cp.y = margin.y + (gap + cellSize) * i + cellSize / 2;
            cp.x = margin.x + (gap + cellSize) * j + cellSize / 2;
            centerPoints.push(cp);
        }
    }
}

function drawCircles() {
	push();
	drawingContext.shadowOffsetX = 0;
	drawingContext.shadowOffsetY = 0;
	drawingContext.shadowBlur = 20;
	drawingContext.shadowColor = "#fff";
	for (let i = 0; i < centerPoints.length; i++) {
			let p = centerPoints[i];
			let r = Math.floor(Math.random() * radius);
			let lineWidth = Math.floor(Math.random() * 5)
			let color = [Math.floor(Math.random()*360), 100, 60];
			strokeWeight(lineWidth);
			noFill();
			stroke(color);
			circle(p.x, p.y, r);
	}
	pop();
}



class Rain{
	constructor(pos) {

    this.pos = pos;
    this.frame = 0;
    this.rad = 0;
    this.v = createVector(0,10,0);
    this.rad_v = 2;
    this.line_len=10;

	}



	display(color) {

    if(this.pos.y>0){
      push();
      translate(this.pos.x, 0, this.pos.z);
      rotateX(PI/2);
      noFill();
      strokeWeight(1);
      stroke(color.x, color.y, color.z);
      circle(0, 0, this.rad);
      pop();

      this.rad+=this.rad_v;
    }
    else{
      push();
      stroke(color.x, color.y, color.z);
      strokeWeight(1);
      line(this.pos.x, this.pos.y, this.pos.z, this.pos.x, this.pos.y-this.line_len, this.pos.z);
      pop();
      this.pos.add(this.v);
    }



    this.frame++;

	}

}

class Cloud{
	constructor(pos, color) {
    this.pos = pos;
    this.rad = 100;
    this.v = createVector(0,0,0);
    this.color = color;
    this.rain_arr = [];
    this.frame = 0;


	}
  display(thunder) {
    let cycle =20;
    this.v = createVector(cos(this.frame/cycle),0, sin(this.frame/cycle)).mult(0.5);

    let rain_arr_new = [];
    for(let i=0; i<this.rain_arr.length; i++){
      if(this.rain_arr[i].rad<15){
        let color = createVector(0,0,0);
        if(thunder){
          color=createVector(0,0,100);

        }
        this.rain_arr[i].display(color);
        append(rain_arr_new, this.rain_arr[i]);
      }

    }


    if(random()<0.5){
      let r = this.rad * random();
      let theta = random(2*PI);
      let new_pos_dir = p5.Vector.mult(createVector(1,0), r).rotate(theta);
      let new_pos = createVector(this.pos.x+new_pos_dir.x, this.pos.y, this.pos.z+new_pos_dir.y);
      append(rain_arr_new, new Rain(new_pos));
    }

    // console.log(this.pos);

    this.rain_arr = rain_arr_new;



    this.pos.add(this.v);

    // color
    this.color.x = (this.color.x+0.1)%100;

    this.frame++;



	}

}

let cloud_arr = [];


function setup() {
  
  createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 100);
	background(100);
  frameRate(30);
  let cam = createCamera();

  cam.setPosition(0, -30, 100,0,0,0);
	
  append(cloud_arr, new Cloud(createVector(-100, -300 , -200), createVector(0, 0,0)));
  append(cloud_arr, new Cloud(createVector(-100, -300 , -50), createVector(0, 0,0)));
  append(cloud_arr, new Cloud(createVector(0, -300 , -200), createVector(0, 0,0)));
  append(cloud_arr, new Cloud(createVector(100, -300 , -50), createVector(0, 0,0)));
  append(cloud_arr, new Cloud(createVector(100, -300 , -100), createVector(0, 0,0)));

}

let thunder_count=0;

let thunder_count_max=30;

function draw() {

  let thunder=false;

  if(random()<0.01){
    thunder=true;
    thunder_count=thunder_count_max;
  }

  if(thunder_count%(thunder_count_max/2)>thunder_count_max*2/6){
    thunder=true;
  }

  if(thunder){
    background(0);
  } else{
    background(100);
  }

  thunder_count--;
  for(let i=0; i<cloud_arr.length; i++){
    cloud_arr[i].display(thunder);
  }

}
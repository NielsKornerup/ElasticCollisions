var canvas = document.getElementById("Collisions-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var Speed = 2;
var MaxSize= 30;
var Num = 2;
var allParticles=[];
var PI = 3.141592;
var maxSpeed = 10;
var maxDist =900;
var vectors = false;

function initializeParticles() {
	document.getElementById('numparticles').value=Num;
	for (var i = 0; i < Num; i++) {
		var particle = new Object();
		particle.radius = Math.random() * MaxSize;
		particle.position = new Object();
		particle.velocity = new Object();
		particle.newPosition = new Object();
		particle.newVelocity = new Object();
		particle.position.x = (Math.random() * (width-5))+5;
		particle.position.y = (Math.random() * (height-particle.radius))+particle.radius;
		particle.velocity.x = Math.random() * maxSpeed;
		particle.velocity.y = Math.random() * maxSpeed;
		particle.mass = particle.radius*particle.radius;
		particle.newVelocity.x=particle.velocity.x;
		particle.newVelocity.y=particle.velocity.y;
		allParticles.push(particle);
	}
}

function moveParticles(){
	for (var a = 0; a < allParticles.length; a++) {
		allParticles[a].newVelocity.y=allParticles[a].velocity.y;
		allParticles[a].newVelocity.x=allParticles[a].velocity.x;
		allParticles[a].newPosition.x=allParticles[a].position.x;
		allParticles[a].newPosition.y=allParticles[a].position.y;
		for (var b = 0; b < allParticles.length; b++) {
			var difX = (allParticles[a].position.x-allParticles[b].position.x);
			var difY = (allParticles[a].position.y-allParticles[b].position.y);
			var dist = Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
			var difX2 = difX;
			var difY2 = difY;
			var dist2 = dist;
			if(dist!=0&&dist<=(allParticles[a].radius+allParticles[b].radius)/*&&allParticles[a].cooldown<=0&&allParticles[b].cooldown<=0*/){

				var aSpeed = Math.sqrt(Math.pow(allParticles[a].velocity.x,2)+Math.pow(allParticles[a].velocity.y,2));
				var bSpeed = Math.sqrt(Math.pow(allParticles[b].velocity.x,2)+Math.pow(allParticles[b].velocity.y,2));

				while(bSpeed<=aSpeed&&/*allParticles[a].radius<=allParticles[b].radius&&*/dist2<(allParticles[a].radius+allParticles[b].radius)){
					difX2 = (allParticles[a].newPosition.x-allParticles[b].position.x);
					difY2 = (allParticles[a].newPosition.y-allParticles[b].position.y);
					dist2 =Math.sqrt((Math.pow(difX2,2)+Math.pow(difY2,2)));
					allParticles[a].newPosition.x=allParticles[a].newPosition.x-allParticles[a].velocity.x/10;
					allParticles[a].newPosition.y=allParticles[a].newPosition.y-allParticles[a].velocity.y/10;
				}

				allParticles[a].newVelocity.y=(((allParticles[a].velocity.y*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].velocity.y))/(allParticles[a].mass+allParticles[b].mass));

				allParticles[a].newVelocity.x=(((allParticles[a].velocity.x*(allParticles[a].mass-allParticles[b].mass))+(2*allParticles[b].mass*allParticles[b].velocity.x))/(allParticles[a].mass+allParticles[b].mass));

			}
		}
	}

	for (var a = 0; a < allParticles.length; a++) {
		allParticles[a].position.x=allParticles[a].newPosition.x;
		allParticles[a].position.y=allParticles[a].newPosition.y;
		allParticles[a].velocity.x=allParticles[a].newVelocity.x;
		allParticles[a].velocity.y=allParticles[a].newVelocity.y;
	}

	for (var x = 0; x < allParticles.length; x++) {
		allParticles[x].position.x+=allParticles[x].velocity.x;
		allParticles[x].position.y+=allParticles[x].velocity.y;
		if (allParticles[x].position.x >= canvas.width-(allParticles[x].radius/2)) {
			allParticles[x].velocity.x=-Math.abs(allParticles[x].velocity.x);
        	}
		if(allParticles[x].position.x <= (allParticles[x].radius)){
			allParticles[x].velocity.x=Math.abs(allParticles[x].velocity.x);
		}
		if (allParticles[x].position.y >= canvas.height-(allParticles[x].radius/2)) {
			allParticles[x].velocity.y = -Math.abs(allParticles[x].velocity.y);
		}
		if(allParticles[x].position.y <= (allParticles[x].radius)){
			allParticles[x].velocity.y = Math.abs(allParticles[x].velocity.y);
		}
	}
}

function drawParticles() {
	ctx.fillStyle = "rgba(255,255,255,.2)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < allParticles.length; i++) {
		particle = allParticles[i];
		ctx.beginPath();
		var colorString = 'rgb(0,0,255)';
		ctx.strokeStyle = colorString;
		ctx.arc(particle.position.x /*- (charge.radius)*/, particle.position.y /*- (charge.radius)*/, particle.radius, 0, 2 * PI);
		ctx.fill();
		ctx.stroke();
		if(vectors){
			ctx.beginPath();-
			ctx.moveTo(particle.position.x,particle.position.y);
			ctx.lineTo((particle.position.x+(particle.velocity.x*particle.radius*particle.radius/3)),(particle.position.y+(particle.velocity.y*particle.radius*particle.radius/3)));
			ctx.fill();
			ctx.stroke();
		}
	}
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeParticles();

$("#controls-submit").click(function() {
	Num = $("#numparticles").val();
	vectors = $("#vect").is(":checked");
	allParticles = [];
	initializeParticles();
});

function main() {
	moveParticles();
	drawParticles();
	requestAnimationFrame(main);
};
requestAnimationFrame(main);

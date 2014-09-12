var canvas = document.getElementById("charge-canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var chargeSpeed = 2;
var chargeMaxSize= 30;
var numCharges = 2;
var allParticles=[];
var gravConstant = .1;
var PI = 3.141592;
var maxSpeed = 10;
var maxDist =900;

function initializeCharge() {
    for (var i = 0; i < numCharges; i++) {
        var charge = new Object();
	charge.radius = Math.random() * chargeMaxSize;
        charge.x = (Math.random() * (width-5))+5;
        charge.y = (Math.random() * (height-charge.radius))+charge.radius;
        charge.xSpeed = Math.random() * chargeSpeed;
        charge.ySpeed = Math.random() * chargeSpeed;
	charge.coolDown = 0;
	allParticles.push(charge);
    }
}

function moveCharges(){
for (var a = 0; a < allParticles.length; a++) {
for (var b = 0; b < allParticles.length; b++) {
var difX = (allParticles[a].x-allParticles[b].x);
var difY = (allParticles[a].y-allParticles[b].y);
var dist =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));
var aAngle = 0;
var bAngle = 0;
var caAngle = 0;
var difX2 = (allParticles[a].x-allParticles[b].x);
var difY2 = (allParticles[a].y-allParticles[b].y);
var dist2 =Math.sqrt((Math.pow(difX,2)+Math.pow(difY,2)));

allParticles[a].newX=allParticles[a].x;
allParticles[a].newY=allParticles[a].y;
allParticles[a].coolDown--;
allParticles[b].coolDown--;
if(allParticles[a].coolDown<=0&&allParticles[b].coolDown<=0&&dist!=0&&dist<(allParticles[a].radius+allParticles[b].radius)){

allParticles[a].coolDown = 6;
allParticles[b].coolDown = 6;

while(/*allParticles[a].radius<allParticles[b].radius&&*/dist2-1<(allParticles[a].radius+allParticles[b].radius)){
	difX2 = (allParticles[a].newX-allParticles[b].x);
	difY2 = (allParticles[a].newY-allParticles[b].y);
	dist2 =Math.sqrt((Math.pow(difX2,2)+Math.pow(difY2,2)));
	allParticles[a].newX=allParticles[a].newX-allParticles[a].xSpeed/10;
	allParticles[a].newY=allParticles[a].newY-allParticles[a].ySpeed/10;
}
console.log("test");

if(allParticles[a].xSpeed>0){
 aAngle = Math.atan(allParticles[a].xSpeed/allParticles[a].ySpeed);
}
else{
 aAngle = Math.atan(allParticles[a].xSpeed/allParticles[a].ySpeed)+Math.PI;
}

if(allParticles[b].xSpeed>0){
 bAngle = Math.atan(allParticles[b].xSpeed/allParticles[b].ySpeed);
}
else{
 bAngle = Math.atan(allParticles[b].xSpeed/allParticles[b].ySpeed)+Math.PI;
}

if(difX>0){
 caAngle = Math.atan(difX/difY);
}
else{
 caAngle = Math.atan(difX/difY)+Math.PI;
}
var cbAngle = caAngle +Math.PI;
var aSpeed = Math.pow(Math.pow(allParticles[a].xSpeed,2)+Math.pow(allParticles[a].ySpeed,2),.5);
var bSpeed = Math.pow(Math.pow(allParticles[b].xSpeed,2)+Math.pow(allParticles[b].ySpeed,2),.5);

allParticles[a].xSpeed=((aSpeed*Math.cos(aAngle-caAngle)*(Math.pow(allParticles[a].radius,2)-Math.pow(allParticles[b].radius,2))+2*Math.pow(allParticles[b].radius,2)*bSpeed*Math.cos(bAngle-caAngle))/(Math.pow(allParticles[a].radius,2)+Math.pow(allParticles[b].radius,2)))*Math.cos(caAngle)+aSpeed*Math.sin(aAngle-caAngle)*Math.cos(caAngle+Math.PI/2);

allParticles[a].ySpeed=((aSpeed*Math.cos(aAngle-caAngle)*(Math.pow(allParticles[a].radius,2)-Math.pow(allParticles[b].radius,2))+2*Math.pow(allParticles[b].radius,2)*bSpeed*Math.cos(bAngle-caAngle))/(Math.pow(allParticles[a].radius,2)+Math.pow(allParticles[b].radius,2)))*Math.sin(caAngle)+aSpeed*Math.sin(aAngle-caAngle)*Math.sin(caAngle+Math.PI/2);
}
}
}

for (var a = 0; a < allParticles.length; a++) {
	allParticles[a].x=allParticles[a].newX;
	allParticles[a].y=allParticles[a].newY;
}

for (var x = 0; x < allParticles.length; x++) {
if(allParticles[x].xSpeed>maxSpeed){
allParticles[x].xSpeed=maxSpeed;
}
if(allParticles[x].ySpeed>maxSpeed){
allParticles[x].ySpeed=maxSpeed;
}
allParticles[x].x+=allParticles[x].xSpeed;
allParticles[x].y+=allParticles[x].ySpeed;
if (allParticles[x].x >= canvas.width-(allParticles[x].radius/2)) {
         	allParticles[x].xSpeed=-Math.abs(allParticles[x].xSpeed);
         }
if(allParticles[x].x <= (allParticles[x].radius)){
		allParticles[x].xSpeed=Math.abs(allParticles[x].xSpeed);
	}
         if (allParticles[x].y >= canvas.height-(allParticles[x].radius/2)) {
         allParticles[x].ySpeed = -Math.abs(allParticles[x].ySpeed);
}
if(allParticles[x].y <= (allParticles[x].radius)){
	allParticles[x].ySpeed = Math.abs(allParticles[x].ySpeed);
}
}
}

function drawCharges() {
    ctx.fillStyle = "rgba(255,255,255,.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < allParticles.length; i++) {
        charge = allParticles[i];
        ctx.beginPath();
        var colorString = 'rgb(0,0,255)';
        //ctx.fillStyle = colorString;
        ctx.strokeStyle = colorString;
        ctx.arc(charge.x /*- (charge.radius)*/, charge.y /*- (charge.radius)*/, charge.radius, 0, 2 * PI);
        ctx.fill();
        ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(charge.x,charge.y);
	ctx.lineTo(charge.x+(charge.xSpeed*charge.radius*charge.radius),charge.y+(charge.ySpeed*charge.radius*charge.radius));
	ctx.fill();
	ctx.stroke();
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
initializeCharge();

$("#controls-submit").click(function() {
numCharges = $("#numparticles").val();
gravConstant = $("#gravstr").val()/100;
allParticles = [];
initializeCharge();
});

function main() {
moveCharges();
drawCharges();
requestAnimationFrame(main);
};
requestAnimationFrame(main);

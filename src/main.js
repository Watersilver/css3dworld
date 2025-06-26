import input from "./input.js";
import Camera from "./Camera.js";
import Vector from "./Vector.js";

const {keyboard: keys} = input;

const cam = new Camera(document.querySelector("#world-wrapper .camera"));

const speed = 60;
const angleSpeed = 1;
let before = performance.now();
setInterval(() => {
  const now = performance.now();
  const dt = (now - before) * 0.001;

  let velocity = new Vector(0,0,0);
  if (keys.w) {
    velocity[2] += -1;
  }
  if (keys.a) {
    velocity[0] += -1;
  }
  if (keys.s) {
    velocity[2] += 1;
  }
  if (keys.d) {
    velocity[0] += 1;
  }
  if (keys[2]) {
    velocity[1] += -1;
  }
  if (keys.x) {
    velocity[1] += 1;
  }
  velocity = velocity.getNormal().multiply(speed * dt);
  cam.move(velocity);

  const rotAxis = new Vector(0,0,0);
  // Orientation
  if (keys.q) {
    // cam.rotateZ(-0.1);
    rotAxis[2] += -1;
  }
  if (keys.e) {
    // cam.rotateZ(0.1);
    rotAxis[2] += 1;
  }
  if (keys.ArrowLeft) {
    // cam.rotateY(0.1);
    rotAxis[1] += 1;
  }
  if (keys.ArrowRight) {
    // cam.rotateY(-0.1);
    rotAxis[1] += -1;
  }
  if (keys.ArrowUp) {
    // cam.rotateX(0.1);
    rotAxis[0] += 1;
  }
  if (keys.ArrowDown) {
    // cam.rotateX(-0.1);
    rotAxis[0] += -1;
  }
  // Only rotate if axis is not zero vector
  if (rotAxis.getMagnitude()) {
    cam.rotate(rotAxis, angleSpeed * dt)
  }

  before = now;
})
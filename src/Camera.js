class CamPosition extends Array {
  add(posChangeVec) {
    for (const i in posChangeVec) {
      this[i] += posChangeVec[i];
    }
  }
}

class Camera {
  constructor(cameraElem) {
    // Make sure correct class is present
    cameraElem.classList.add("camera");

    // private props
    this._cameraElem = cameraElem;
    this._orientation = new Quaternion();
    this._position = new CamPosition(0,0,0);

    this._transform();

    const animate = () => {
      this._transform();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  rotate(axis, angle) {
    // Create rotation
    const rot = new Quaternion.fromAxisAngle(axis, angle);
    // Apply rotation
    this._orientation = this._orientation.mul(rot);
  }

  rotateX(angle) {
    this.rotate([1,0,0], angle);
  }

  rotateY(angle) {
    this.rotate([0,1,0], angle);
  }

  rotateZ(angle) {
    this.rotate([0,0,1], angle);
  }

  move(vec) {
    this._position.add(this._orientation.rotateVector(vec))
  }

  moveForward(step) {
    // this._position.add(this._orientation.rotateVector([0,0,-step]))
    this.move([0,0,-step]);
  }

  moveBackward(step) {
    this.move([0,0,step]);
  }

  moveLeft(step) {
    this.move([-step,0,0]);
  }

  moveRight(step) {
    this.move([step,0,0]);
  }

  _transform() {
    const pos = this._position;
    // Translate then rotate
    // Edw to +x einai deksia, +y panw kai +z pisw
    this._cameraElem.style.transformOrigin = `
      calc(50% + ${pos[0]}mm)
      calc(50% + ${pos[1]}mm)
      calc(var(--persp) + ${pos[2]}mm)
    `;
    // Edw to +x einai aristera, +y katw kai +z mprosta
    this._cameraElem.style.transform = `
      translateX(${-pos[0]}mm)
      translateY(${-pos[1]}mm)
      translateZ(${-pos[2]}mm)
      matrix3d(${this._orientation.toMatrix4()})
    `
  }
}

export default Camera;
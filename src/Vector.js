class Vector extends Array {
  getMagnitude() {
    let magn = 0;
    for (const component of this) {
      magn += component**2
    }
    return Math.sqrt(magn);
  }

  getNormal() {
    const normal = new Vector();
    const magn = this.getMagnitude();
    const invMagn = magn !== 0 ? 1 / (magn) : 1;
    for (const i in this) {
      normal[i] = this[i] * invMagn
    }
    return normal;
  }

  multiply(value) {
    const multipliedVec = new Vector();
    for (const i in this) {
      multipliedVec[i] = this[i] * value
    }
    return multipliedVec;
  }
}

export default Vector;
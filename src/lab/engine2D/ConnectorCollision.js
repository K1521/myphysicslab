// Copyright 2016 Erik Neumann.  All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.module('myphysicslab.lab.engine2D.ConnectorCollision');

goog.require('goog.asserts');

const Connector = goog.require('myphysicslab.lab.engine2D.Connector');
const RigidBody = goog.require('myphysicslab.lab.engine2D.RigidBody');
const RigidBodyCollision = goog.require('myphysicslab.lab.engine2D.RigidBodyCollision');
const Util = goog.require('myphysicslab.lab.util.Util');
const Vector = goog.require('myphysicslab.lab.util.Vector');

/** A RigidBodyCollision generated by a Connector.
*/
class ConnectorCollision extends RigidBodyCollision {
/**
* @param {!RigidBody} body the first body of the collision
* @param {!RigidBody} normalBody the second body of the collision, which often
    determines the normal vector
* @param {!Connector} theConnector the Connector that generated this collision
* @param {boolean} joint whether this is a bilateral constraint which can both
    push and pull.
*/
constructor(body, normalBody, theConnector, joint) {
  super(body, normalBody, joint);
  /** Connector that generated this collision
  * @type {!Connector}
  * @private
  */
  this.theConnector_ = theConnector;
};

/** @override */
toString() {
  return Util.ADVANCED ? '' :
      super.toString().slice(0, -1)
      +', theConnector_='+this.theConnector_+'}';
};

/** @override */
getClassName() {
  return 'ConnectorCollision';
};

/** @override */
checkConsistent() {
  super.checkConsistent();
  goog.asserts.assert( this.impact2 != null );
  if (this.normal_dt != null) {
    // Having derivative of normal implies the normal is curved.
    // unless the derivative is always zero.
    goog.asserts.assert( this.ballNormal);
  }
};

/** @override */
getConnector() {
  return this.theConnector_;
};

/** @override */
similarTo(c) {
  return false;
};

/** @override */
updateCollision(time) {
  this.theConnector_.updateCollision(this);
  super.updateCollision(time);
};

} // end class
exports = ConnectorCollision;

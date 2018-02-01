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

goog.module('myphysicslab.lab.model.Simulation');

const SimList = goog.require('myphysicslab.lab.model.SimList');
const SimObject = goog.require('myphysicslab.lab.model.SimObject');
const Subject = goog.require('myphysicslab.lab.util.Subject');

/**  The mathematical model of a simulation.

To communicate its state to the outside world, a Simulation contains a {@link SimList}
to which are added {@link SimObject}s like PointMass, Spring, etc.

An {@link myphysicslab.lab.model.AdvanceStrategy AdvanceStrategy} moves the Simulation
forward in time, by solving the mathematical model for the next small increment in time.
The method {@link #modifyObjects} is called separately to ensure the SimObjects match
the new Simulation state.

A Simulation usually keeps track of the current time, see {@link #getTime}.
There are no explicit units for the time, so you can regard a time unit as seconds or
years as desired.
See [About Units Of Measurement](Architecture.html#aboutunitsofmeasurement).
Changing the Simulation time by a large amount can affect synchronization with the
Clock used to advance the Simulation; see {@link myphysicslab.lab.app.SimRunner}
section *How Simulation Advances with Clock*.

A Simulation can store its initial state with {@link #saveInitialState} and return to
that initial state with {@link #reset}. The current time is saved with the initial
state.

* @interface
*/
class Simulation extends Subject {

/** Returns the list of {@link SimObject}s that represent this Simulation.
@return {!SimList} the list of SimObjects that represent this simulation
*/
getSimList() {}

/** Returns the current Simulation time.
@return {number} the current Simulation time.
@throws {!Error} if there is no time variable for the simulation
*/
getTime() {}

/** Updates the SimObjects to match the current internal state of the Simulation.
@return {undefined}
*/
modifyObjects() {}

/** Sets the Simulation back to its initial conditions, see {@link #saveInitialState},
and calls {@link #modifyObjects}. Broadcasts event named {@link #RESET}.
@return {undefined}
*/
reset() {}

/** Saves the current variables and time as the initial state, so that this initial
state can be restored with {@link #reset}.
Broadcasts event named {@link #INITIAL_STATE_SAVED}.
@return {undefined}
*/
saveInitialState() {}

} // end class

/**  Name of event broadcast when the Simulation state is reset to initial conditions.
* @type {string}
* @const
*/
Simulation.RESET = 'RESET';

/**  Name of event broadcast when initial state is saved.
* @type {string}
* @const
*/
Simulation.INITIAL_STATE_SAVED = 'INITIAL_STATE_SAVED';

exports = Simulation;

// Copyright 2017 Erik Neumann.  All Rights Reserved.
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

goog.module('myphysicslab.lab.util.ConcreteMemoList');

goog.require('goog.array');
const MemoList = goog.require('myphysicslab.lab.util.MemoList');
const Memorizable = goog.require('myphysicslab.lab.util.Memorizable');
const Util = goog.require('myphysicslab.lab.util.Util');

/** Concrete implementation of {@link MemoList}.
* @implements {MemoList}
*/
class ConcreteMemoList {
constructor() {
  /**
  * @type {!Array<!Memorizable>}
  * @private
  */
  this.memorizables_ = [];
  /** This flag helps to prevent modification of the list while iterating.
  * @type {boolean}
  * @private
  */
  this.isMemorizing_ = false;
};

/** @override */
toString() {
  return Util.ADVANCED ? '' : 'ConcreteMemoList{'
      +'memorizables_: ['
      + goog.array.map(this.memorizables_, function(a) { return a.toStringShort(); })
      +']}';
};

/** @override */
toStringShort() {
  return Util.ADVANCED ? '' :
      'ConcreteMemoList{memorizables_.length: '+this.memorizables_.length+'}';
};

/** @override */
addMemo(memorizable) {
  if (this.isMemorizing_) {
    throw new Error('addMemo during memorize');
  }
  if (!goog.array.contains(this.memorizables_, memorizable)) {
    this.memorizables_.push(memorizable);
  }
};

/** @override */
getMemos() {
  return goog.array.clone(this.memorizables_);
};

/** @override */
memorize() {
  try {
    this.isMemorizing_ = true;
    goog.array.forEach(this.memorizables_, function(c) { c.memorize(); });
  } finally {
    this.isMemorizing_ = false;
  }
};

/** @override */
removeMemo(memorizable) {
  if (this.isMemorizing_) {
    throw new Error('removeMemo during memorize');
  }
  goog.array.remove(this.memorizables_, memorizable);
};

} // end class
exports = ConcreteMemoList;

/**
 * @author jay harris
 */

define(['lodash'], function(_) {
    var _Node = function(element) {
        this.element = element;
        this.parent = this;
        this.rank = 0;

        this.unwrap = function() { return element; };
    }

    // a node to return if we're looking for a node that's not in this DisjointSet
    var defaultNode = new _Node(undefined);

    var DisjointSet = function() {
        var forest = [], _forest = _(forest);
        var elements = 0;
        var sets = 0;

        /**
         * Add a new element to this DisjointSet as a singleton set.
         *
         * @param {*} element the new element
         * @return this
         */
        this.makeSet = this.add = function(element) {
            forest.push(new _Node(element));
            ++elements;
            ++sets;
            return this;
        };

        /**
         * Get the number of elements in this DisjointSet.
         *
         * @return {Integer} the number of elements in this DisjointSet
         */
        this.size = this.numElements = function() {
            return elements;
        };

        /**
         * Find an element in the set (via the === operator) and return its
         * representative element. That is, if X and Y are in the same disjoint
         * set, then this.find(X) === this.find(Y).
         *
         * @param {*} element the element to find
         * @return {*} the element's set representative if the element is in
         *  this DisjointSet, otherwise undefined.
         */
        this.find = function(element) {
            var theNode = _forest.find(function(node) {
                return node.element === element;
            });
            if (!theNode) {
                return undefined;
            }

            return findRootNode(theNode).unwrap();
        };

        /**
         * Merge two disjoint sets into one.
         *
         * @param {*} elX an element in one set
         * @param {*} elY an element possibly in another set
         * @return {Boolean} true if the set containing elX and the set containing
         *  elY were merged, false if they were already in the same set
         * @throws {ReferenceError} if elX or elY isn't found in this DisjointSet
         */
        this.union = this.merge = function(elX, elY) {
            var xRoot = findRootNode(elX);
            var yRoot = findRootNode(elY);
            if (!xRoot || !yRoot) {
                throw new ReferenceError("Elements must exist to be merged.");
            }
            if (xRoot === yRoot) {
                return false;
            }

            if (xRoot.rank < yRoot.rank) {
                xRoot.parent = yRoot;
            }
            else if (xRoot.rank > yRoot.rank) {
                yRoot.parent = xRoot;
            }
            else {
                yRoot.parent = xRoot;
                ++xRoot.rank;
            }

            --sets;
            return true;
        };

        /**
         * Set a given element to be the representative of its disjoint set tree.
         *
         * @param {*} nodeOrElement the new representative
         * @return {*} the new representative, or undefined if the original element
         *  isn't in this DisjointSet
         */
        this.setRoot = function(nodeOrElement) {
            var node = nodeOrElement;
            if (!(node instanceof _Node)) {
                node = _forest.find(function(node) {
                    return node.element === nodeOrElement;
                });
            }

            node = node || defaultNode;
            if (node.parent != node) {
                findRootNode(node).parent = node.parent = node;
            }
            return node.unwrap();
        };

        /**
         * Find the root node of the set containing the given parameter.
         *
         * @param {*} nodeOrElement the element we're looking for, or the node
         *  containing it
         * @return {_Node} the node containing the element we're looking for, or
         *  a default, empty (element === undefined) _Node if the element isn't
         *  in this DisjointSet.
         */
        var findRootNode = function(nodeOrElement) {
            var node = nodeOrElement;
            if (!(node instanceof _Node)) {
                node = _forest.find(function(node) {
                    return node.element === nodeOrElement;
                });
                if (node === undefined) {
                    return defaultNode;
                }
            }

            if (node.parent != node) {
                node.parent = findRootNode(node.parent);
            }
            return node.parent;
        };

        /**
         * Get the number of individual sets in this DisjointSet.
         *
         * @return {Integer} the number of individual sets in this DisjointSet
         */
        this.count = this.forestSize = function() {
            return sets;
        }
    };

    return DisjointSet;
});

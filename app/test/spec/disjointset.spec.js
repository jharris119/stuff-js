define(['js/disjointset'], function(DisjointSet) {
    describe(
        "We should be able to add singleton elements to the disjoint set -- ",
        function() {
            var disjointSet = new DisjointSet();
            it(
                "should be initially empty",
                function() {
                    expect(disjointSet.size()).toBe(0);
                }
            );

            it(
                "should add new elements as singleton sets",
                function() {
                    disjointSet.add('foo');
                    disjointSet.add('bar');
                    disjointSet.add('buzz');

                    expect(disjointSet.size()).toBe(3);
                    expect(disjointSet.count()).toBe(3);

                    // expect(disjointSet.find('foo')).not.toEqual(disjointSet.find('bar'));
                    // expect(disjointSet.find('bar')).not.toEqual(disjointSet.find('buzz'));
                    // expect(disjointSet.find('buzz')).not.toEqual(disjointSet.find('foo'));
                }
            );
        }
    );

    describe(
        "We need to get the representative for an element in the disjoint set -- ",
        function() {
            var disjointSet = new DisjointSet();

            var testObj = {
                word: 'six',
                number: 6
            };

            disjointSet.add('foo');
            disjointSet.add('bar');
            disjointSet.add('buzz');
            disjointSet.add('quux');
            disjointSet.add('blerg');
            disjointSet.add('zop');
            disjointSet.add(testObj);

            it(
                "should return singleton objects correctly",
                function() {
                    expect(disjointSet.find('buzz')).toBe('buzz');
                    expect(disjointSet.find(testObj)).toBe(testObj);
                }
            );

            it(
                "should be undefined if you 'find' an object not in the set",
                function() {
                    expect(disjointSet.find('nope')).toBeUndefined();
                }
            );
        }
    );

    describe(
        "Disjoint sets can be merged -- ",
        function() {
            var disjointSet = new DisjointSet();

            var testObj = {
                word: 'six',
                number: 6
            };

            disjointSet.add('foo');
            disjointSet.add('bar');
            disjointSet.add('buzz');
            disjointSet.add('quux');
            disjointSet.add('blerg');
            disjointSet.add('zop');
            disjointSet.add(testObj);

            it(
                "should merge two sets correctly",
                function() {
                    disjointSet.union('buzz', 'bar');
                    expect(disjointSet.find('buzz')).toEqual(disjointSet.find('bar'));
                }
            );
        }
    );
});

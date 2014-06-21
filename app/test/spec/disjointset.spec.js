define(['js/disjointset'], function(DisjointSet) {
    describe(
        "Disjoint Set",
        function() {
            var disjointset;
            var testObj = {
                word: 'six',
                number: 6
            };

            beforeEach(function() {
                disjointset = new DisjointSet();

                disjointset.add('foo');
                disjointset.add('bar');
                disjointset.add('buzz');
                disjointset.add('quux');
                disjointset.add('blerg');
                disjointset.add('zop');
                disjointset.add(testObj);

                disjointset.union('foo', 'blerg');
                disjointset.union('bar', 'quux');
                disjointset.union('zop', 'quux');
            });

            it(
                "should be initially empty",
                function() {
                    expect((new DisjointSet()).size()).toBe(0);
                }
            );

            it(
                "should add new elements as singleton sets",
                function() {
                    var tmp = new DisjointSet();
                    tmp.add('Mickey').add('Goofy').add('Pluto');

                    expect(tmp.size()).toBe(3);
                    expect(tmp.count()).toBe(3);

                    expect(tmp.find('Mickey')).not.toEqual(tmp.find('Goofy'));
                    expect(tmp.find('Goofy')).not.toEqual(tmp.find('Pluto'));
                    expect(tmp.find('Pluto')).not.toEqual(tmp.find('Mickey'));
                }
            );

            it(
                "should find and return the representative for an element",
                function() {
                    expect(disjointset.find('buzz')).toBe('buzz');
                    expect(disjointset.find(testObj)).toBe(testObj);

                    expect(disjointset.find('foo')).toEqual(disjointset.find('blerg'));
                    expect(disjointset.find('bar')).toEqual(disjointset.find('zop'));

                    expect(disjointset.find('not here')).toBeUndefined();
                }
            );

            it(
                "should merge disjoint sets correctly",
                function() {
                    // precondition
                    expect(disjointset.find(testObj)).not.toEqual(disjointset.find('blerg'));
                    expect(disjointset.count()).toBe(4);

                    disjointset.merge(testObj, 'blerg');

                    // postcondition
                    expect(disjointset.find(testObj)).toEqual(disjointset.find('blerg'));
                    expect(disjointset.count()).toBe(3);

                    // precondition
                    expect(disjointset.find('zop')).not.toEqual(disjointset.find('foo'));

                    disjointset.merge('zop', 'foo');
                    expect(disjointset.find('zop')).toEqual(disjointset.find(testObj));
                    expect(disjointset.count()).toBe(2);
                }
            )
        }
    );
});

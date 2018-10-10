define(["modules/minheap"], function (BinaryHeap) {

  return {
    run: function (graph, start) {
      var Q = new BinaryHeap(
        function (e) {
          return e.key;
        },
        function (e) {
          return e.id;
        },
        'key'), N = graph.V.length, E = graph.E.length, D = {};

      graph.V.forEach(function (vertex) {
        if (vertex === start) {
          vertex.key = 0;
        }
        Q.push(vertex);
      });

      for (var k = 0; k < N; k++) {
        var vertex = Q.pop();
        D[vertex.id] = vertex.key;
        for (var i = 0; i < E; i++) {
          var edge = graph.E[i];
          if (edge.from === vertex) {
            if (edge.w + vertex.key < edge.to.key) {
              Q.decreaseKey(edge.to.id, edge.w + vertex.key);
            }
          }
        }
      }

      return D;
    }

  };

});
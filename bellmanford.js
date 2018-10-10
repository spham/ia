define(["underscore"], function (_) {
  return {
    distances: {},
    parents: {},

    prepare: function (graph, start) {
      _.each(graph.V, function (vertex) {
        this.distances[vertex.id] = Infinity;
        this.parents[vertex.id] = null;
      }.bind(this));
      this.distances[start.id] = 0;
      console.log(this.distances);
    },

    run: function (graph, start) {
      this.prepare(graph, start);
      for (var i = 1, len = graph.V.length; i <= len; ++i) {
        _.each(graph.E, function (edge) {
          if (edge.w + this.distances[edge.from.id] < this.distances[edge.to.id]) {
            this.distances[edge.to.id] = edge.w + this.distances[edge.from.id];
            this.parents[edge.to.id] = edge.from.id;
          }
        }.bind(this));
      }
      var result = {
        "cycle": false,
        "distances": this.distances,
        "parents": this.parents
      };
      // cycle check run
      for (i = 0, len = graph.E.length; i < len; ++i) {
        var edge = graph.E[i];
        if (edge.w + this.distances[edge.from.id] < this.distances[edge.to.id]) {
          this.distances[edge.to.id] = edge.w + this.distances[edge.from.id];
          this.parents[edge.to.id] = edge.from.id;
          result.cycle = true;
          break;
        }
      }
      console.log(this.parents);
      return result;
    },

    log_state: function (start, header) {
      for (var key in this.distances) {
        if (this.distances.hasOwnProperty(key) && key !== start) {
          console.log(start + " -> " + key + " = " + this.distances[key].toFixed(5));
        }
      }
      for (key in this.parents) {
        if (this.parents.hasOwnProperty(key) && key !== start) {
          console.log(key + " reachable from " + this.parents[key]);
        }
      }
    }
  };
});
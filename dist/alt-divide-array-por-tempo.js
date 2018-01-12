;(function(ng) {
  "use strict";

  ng.module('alt.divide-array-por-tempo', [])
    .factory('AltDivideArrayPorTempo', ['$interval', function($interval) {
      function ArrayDivider() {
        this.intervalPromise = null;
      };

      ArrayDivider.prototype.dividir = function(arr, opts, cb) {
        // opts = {
        //   range: numero positivo (fatias do array a serem repassadas)
        //   tempo: numero positivo (tempo de batch em milisegundos)
        // }

        if (!ng.isFunction(cb)) {
          throw new Error('Cb deve ser uma função.');
        }

        var self = this;
        var initPos = 0;
        var lastPos = 0;
        var range = (opts || {}).range || 500;
        var tempo = (opts || {}).tempo || 50;
        var arrCacheSplit = [];

        self.intervalPromise = $interval(function() {
          arrCacheSplit.length = 0;

          initPos = lastPos;
          lastPos += range;

          if (!arr[lastPos]) {
            self.cancelarInterval();
            return;
          }

          for (var i = initPos; i < lastPos; i++) {
            arrCacheSplit.push(arr[i]);
          }

          cb(arrCacheSplit);
        }, tempo);
      };

      ArrayDivider.prototype.cancelarInterval = function() {
        $interval.cancel(this.intervalPromise);
      };

      return ArrayDivider;
    }]);
}(window.angular));

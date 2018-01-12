;(function(ng) {
  "use strict";

  ng.module('alt.divide-array-por-tempo', [])
    .factory('AltDivideArrayPorTempo', ['$interval', function ($interval) {
      class ArrayDivider {
        constructor() {
          this.intervalPromise = null;
        }

        dividir(arr, opts, cb) {
          // opts = {
          //   range: numero positivo (fatias do array a serem repassadas)
          //   tempo: numero positivo (tempo de batch em milisegundos)
          // }

          if (!ng.isFunction(cb)) {
            throw new Error('Cb deve ser uma função.');
          }

          let initPos = 0;
          let lastPos = 0;
          let range = (opts || {}).range || 500;
          let tempo = (opts || {}).tempo || 50;
          let arrCacheSplit = [];

          this.intervalPromise = $interval(() => {
            arrCacheSplit.length = 0;

            initPos = lastPos;
            lastPos += range;

            if (!arr[lastPos]) {
              this.cancelarInterval();
              return;
            }

            for (let i = initPos; i < lastPos; i++) {
              arrCacheSplit.push(arr[i]);
            }

            cb(arrCacheSplit);
          }, tempo);
        }

        cancelarInterval() {
          $interval.cancel(this.intervalPromise);
        }
      }

      return ArrayDivider;
    }]);
}(window.angular));

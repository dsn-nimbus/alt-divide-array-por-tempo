describe('alt.divide-array-por-tempo', function() {
  var _AltDivideArrayPorTempo, _interval;

  beforeEach(module('alt.divide-array-por-tempo'));

  beforeEach(inject(function($injector) {
    _interval = $injector.get('$interval')

    _AltDivideArrayPorTempo = $injector.get('AltDivideArrayPorTempo');
  }))

  describe('instância', function() {
    it('deve ter as propriedades inicializadas corretamente', function() {
      var _d = new _AltDivideArrayPorTempo()

      expect(_d.intervalPromise).toBe(null)
    })
  })

  describe('dividir', function() {
    it('deve retornar o array vazio, array passado é undefined', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = undefined
      var _opt = {}
      var _cb = function(arrSplit) {
        expect(arrSplit).toEqual([])
      }

      _d.dividir(_arr, _opt, _cb)
    })

    it('deve retornar o array vazio, array passado é vazio, opt é undefined', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = []
      var _opt = undefined
      var _cb = function(arrSplit) {
        expect(arrSplit).toEqual([])
      }

      _d.dividir(_arr, _opt, _cb)
    })

    it('deve utilizar as opcoes default, opt é undefined', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = []
      var _opt = undefined
      var _cb = function(arrSplit) {
        expect(true).toBe(true)
      }

      _d.dividir(_arr, _opt, _cb)
    })

    it('deve dar um erro, cb não é uma função', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = []
      var _opt = {}
      var _cb = undefined

      expect(function() {
        _d.dividir(_arr, _opt, _cb)
      }).toThrow(new Error('Cb deve ser uma função.'))
    })

    it('deve retornar o array dividido - 2 elementos no array inicial, 2 retornados, range: 5', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = [
        1, 2
      ]
      var _opt = {range: 5, tempo: 1}
      var _arrDividido = [
        1, 2
      ]
      var _cb = function(arrResposta) {
        expect(arrResposta).toEqual(_arrDividido)
      }

      _d.dividir(_arr, _opt, _cb)

      _interval.flush(1)
    })

    it('deve retornar o array dividido - 5 elementos no array inicial, 5 retornados, range: 5', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = [
        1, 2, 3, 4, 5
      ]
      var _opt = {range: 5, tempo: 1}
      var _arrDividido = [
        1, 2, 3, 4, 5
      ]
      var _cb = function(arrResposta) {
        expect(arrResposta).toEqual(_arrDividido)
      }

      _d.dividir(_arr, _opt, _cb)

      _interval.flush(1)
    })

    it('deve retornar o array dividido - 6 elementos no array inicial, 5 retornados, range: 5', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = [
        1, 2, 3, 4, 5, 6
      ]
      var _opt = {range: 5, tempo: 1}
      var _arrDividido = [
        1, 2, 3, 4, 5
      ]
      var _cb = function(arrResposta) {
        expect(arrResposta).toEqual(_arrDividido)
      }

      _d.dividir(_arr, _opt, _cb)

      _interval.flush(1)
    })

    it('deve retornar o array dividido - 10 elementos no array inicial, 5 retornadosm range: 5', function() {
      var _d = new _AltDivideArrayPorTempo()

      var _arr = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
      ]
      var _opt = {range: 5, tempo: 1}
      var _arrDividido = [
        1, 2, 3, 4, 5
      ]
      var _cb = function(arrResposta) {
        expect(arrResposta).toEqual(_arrDividido)
      }

      _d.dividir(_arr, _opt, _cb)

      _interval.flush(1)
    })
  })

  describe('cancelarInterval', function() {
    it('deve chamar o cancelamento do intervalo', function() {
      spyOn(_interval, 'cancel').and.callThrough()

      var _d = new _AltDivideArrayPorTempo()

      _d.cancelarInterval()

      expect(_interval.cancel).toHaveBeenCalledWith(_d.intervalPromise)
    })
  })
});

/**
 * $storage
 *
 * Uma interface de armazenamento que oferece acesso ao
 * armazenamento, que lhe permite, por exemplo, adicionar,
 * modificar ou excluir itens de dados armazenados
 *
 * @module $sotrage
 * @uthor Cleber de Moraes Goncalves <cleber.programmer>
 * @example
 *
 *        $storage.get('a');
 *
 */
this.Ninja.module('$storage', [

  '$clone',
  '$dispatcher',
  '$format',
  '$extend',
  '$restrict'

], function ($clone, $dispatcher, $format, $extend, $restrict) {

  /**
   * Uma interface de armazenamento que oferece acesso ao
   * armazenamento, que lhe permite, por exemplo, adicionar,
   * modificar ou excluir itens de dados armazenados
   *
   * @public
   * @module Storage
   * @example
   *
   *        $storage.get('a');
   *
   */
  function Storage() {

    /**
     * Torna o Storage auto instanciavel, evitando a necessidade do 'new' toda
     * vez que for utilizar o iterator
     */
    if (!(this instanceof Storage)) {
      return new Storage();
    }

    /**
     * O armazenamento do storage
     */
    var a = {};

    /**
     * Um mediador utilizado para escultar eventos e disparar eventos,
     * permitindo que seus modulos sejam fracamente dependentes de outros modulos
     */
    var dispatcher = $dispatcher.clone();

    /**
     * Revelacao do modulo Storage, encapsulando a visibilidade das funcoes
     * privadas
     */
    return {

      /**
       * Copia as propriedades enumeravies de b para a e retorna a, se b
       * tem uma propriedade de mesmo nome, a propriedade de a sera
       * sobreescrita. Esta modulo nao manipula metodos getter e setter nem copia
       * atributos
       *
       * @public
       * @method extend
       * @param {Objeto} b Segundo objeto
       * @example
       *
       *        $storage.extend({ a: 1 });
       *
       */
      extend: function (b) {
        dispatcher.trigger('extend', $clone($extend(a, $clone(b))));
      },

      /**
       * Quando passodo um nome de chave, retornará que o valor da chave
       *
       * @public
       * @method get
       * @param {String} key Nome da propriedade
       * @returm {Array|Boolean|Date|Funcation|Null|Object|String|Undefined} Valor da propriedade
       * @example
       *
       *        $storage.get('a');
       *
       */
      get: function (key) {
        return $clone(a[key]);
      },

      /**
       * Retornar um array com os nomes das chaves
       *
       * @public
       * @method keys
       * @return {Array} Array com os nomes das chaves
       * @example
       *
       *        $storage.keys();
       *
       */
      keys: function () {
        return $keys(a);
      },

      /**
       * 
       */
      off: dispatcher.off(),

      /**
       *
       */
      on: dispatcher.on(),

      /**
       * Quando passado um nome de chave,
       * irá remover a chave do armazenamento
       *
       * @public
       * @method remove
       * @param {String} key Nome da chave
       * @example
       *
       *        $storage.remove('a');
       *
       */
      remove: function (key) {
        dispatcher.trigger($format('remove:{0}', [key]), void(delete a[key]));
      },

      /**
       * Remove as propriedades de a se nao existir uma propriedade
       * com o mesmo nome em b
       *
       * @public
       * @method restrict
       * @param {Object} b Segundo objeto
       * @example
       *
       *        $storage.restrict({ a: 1 });
       *
       */
      restrict: function (b) {
        dispatcher.trigger('restrict', $extend($restrict(a, $clone(b)), $clone(b)));
      },

      /**
       * Quando passado um nome de chave e valor, irá acrescentar
       * a chave para o armazenamento, ou atualizar o valor dessa chave
       * se ele já existe
       *
       * @public
       * @method set
       * @param {String} key Nome da chave
       * @param {Array|Boolean|Date|Funcation|Null|Object|String|Undefined} Valor da chave
       * @example
       *
       *        $storage.set('a', 1);
       *
       */
      set: function (key, value) {
        dispatcher.trigger($format('set:{0}', [key]), $clone(a[key] = $clone(value)));
      }

    };

  }

  /**
   * Revelacao do modulo $storage, encapsulando a visibilidade das funcoes
   * privadas
   */
  return Storage;

});

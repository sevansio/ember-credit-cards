import Ember from 'ember';
import Validations from 'ember-credit-cards/utils/validations';
import Cards from 'ember-credit-cards/utils/cards';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'form',
  classNames: ['Form', 'Form--creditCard'],
  classNameBindings: ['isValid'],
  name: null,
  number: null,
  month: null,
  year: null,
  cvc: null,
  zipcode: null,
  zipcodeRequired: false,
  showType: false,

  isValid: computed.and('nameValid', 'numberValid', 'expirationValid', 'cvcValid', 'zipcodeValid'),

  becameValid: function() {
    this.sendAction('on-validate', this.get('isValid'));
  }.observes('isValid').on('init'),

  nameValid: computed('name', function() {
    var name = this.get('name');

    if (name) {
      return true;
    }

    return false;
  }),

  numberValid: computed('number', function() {
    var number = this.get('number');

    return Validations.validateNumber(number);
  }),

  expirationValid: computed('month', 'year', function() {
    var month = this.get('month');
    var year  = this.get('year');

    return Validations.validateExpiration(month, year);
  }),

  cvcValid: computed('cvc', 'type', function() {
    var cvc = this.get('cvc');
    var type = this.get('type');

    return Validations.validateCVC(cvc, type);
  }),

  zipcodeValid: computed('zipcodeRequired', 'zipcode', function() {
    if (this.get('zipcodeRequired')) {
      var zip = this.get('zipcode');

      return Validations.validateZipcode(zip);
    }
    
    return true;
  }),

  type: computed('number', function() {
    var number = this.get('number');
    var card = Cards.fromNumber(number);

    if (card) {
      return card.type;
    }
  })
});

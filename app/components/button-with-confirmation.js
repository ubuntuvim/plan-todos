import Component from '@ember/component';

export default Component.extend({
  attributeBindings: ['id'],
  id: 'clear-completed',

  actions: {
    clearCompleted() {
      // this.set('clearCompleted', true);
    console.log('clearCompleted..........');
    }
  },
  click() {
    console.log('clearCompleted..........');
    if (confirm(this.get('text'))) {
      // trigger action on parent component
      // this.get('onConfirm')();
      this.sendAction('clearCompleted');
    }
  }
});

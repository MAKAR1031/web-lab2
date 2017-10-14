require('./app.scss')

var Vue = require('vue/dist/vue.js');

Vue.component('todo-item', {
    props: ['todo'],
    template: `
    <li>{{todo.text}}</li>
  `
});

Vue.component('todo-input', {
    data: function () {
        return {
            newTodo: ''
        };
    },
    methods: {
        onClick: function () {
            if (this.newTodo === '') {
                alert('Необходимо значение');
                return;
            }
            this.$emit('click', this.newTodo);
            this.newTodo = ''
        }
    },
    template: `
    <div>
      <input v-model='newTodo' />
      <button v-on:click='onClick'>Add</button>
    </div>
  `
});

var app = new Vue({
    el: '#app',
    data: {
        todos: []
    },
    methods: {
        addTodo: function (text) {
            console.log(this.todos);
            this.todos.push({
                text: text
            });
        }
    }
});
require('./app.scss')

import Vue from 'vue/dist/vue.js'
import alertify from 'alertify.js'

const counter = {
    props: ['count'],
    template: `
    <div>
        <p>Total todos: {{count}}</p>
    </div>
    `
}

const item = {
    props: ['i', 'todo'],
    methods: {
        togglePriority: function () {
            this.todo.priority = !this.todo.priority;
        },
        removeTask: function () {
            this.$emit('remove', this.i);
        }
    },
    template: `
    <li>
        <span>{{ i + 1 }})</span>
        <span v-bind:class="{'priority-task': todo.priority}">{{ todo.text }}</span>
        <button class='btn priority' @click='togglePriority'>Priority</button>
        <button class='btn remove' @click='removeTask'>Remove</button>
    </li>`
}

const input = {
    props: ['disabled'],
    data: () => {
        return {
            newTodo: ''
        }
    },
    methods: {
        onClick: function () {
            this.$emit('click', this.newTodo);
            this.newTodo = ''
        }
    },
    template: `
    <div>
      <input id="title" v-model='newTodo' @keyup.enter='onClick' :disabled='disabled'/>
      <button class='btn add' @click='onClick' :disabled='disabled'>Add</button>
    </div>
  `
}

var app = new Vue({
    el: '#app',
    data: {
        todos: []
    },
    methods: {
        addTodo: function (text) {
            if (text === '') {
                alertify.alert('First you need to enter the text of the task!');
                return;
            }
            for (let i = 0; i < this.todos.length; i++) {
                if (text === this.todos[i].text) {
                    alertify.alert("You have already added such a task!");
                    return;
                }
            }
            this.todos.push({
                text: text,
                priority: false
            });
        },
        removeTodo: function (index) {
            this.todos.splice(index, 1);
        }
    },
    computed: {
        inputDisabled: function () {
            return this.todos.length >= 10;
        }
    },
    components: {
        'todo-item': item,
        'todo-counter': counter,
        'todo-input': input,
    }
});
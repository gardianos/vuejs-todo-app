<template>
  <div>
    <h3>Todos</h3>
    <div class="legend">
      <span>Double click to mark as complete</span>
      <span>
        <span class="incomplete-box"></span> = Incomplete
      </span>
      <span>
        <span class="complete-box"></span> = Complete
      </span>
    
    </div>
    <div class="todos">
      <div
        @dblclick="onDblClick(todo)"
        :key="todo.id"
        v-for="todo in allTodos"
        class="todo"
        v-bind:class="{'is-complete':todo.completed}"
      >
       
        
        
        {{ todo.title }}
         <i v-if="!todo.editing" class="fa fa-refresh"  style="font-size:13px;color:red;bottom: 30px;" v-on:click="editTodo(todo)"></i>
        <input v-else class="add" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)" v-focus>
        <i class="fas fa-trash-alt" v-on:click="deleteTodo(todo.id)"></i>

       
      </div>

    
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "Todos",
  methods:{
      ...mapActions(["fetchTodos","deleteTodo","updateTodo", "editTodo"]),
      onDblClick(todo) {
      const updatedTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed //if the value is true we will not change id and title
      }
      this.updateTodo(updatedTodo);
    },
   editTodo(todo) {
      this.beforeEditCache = todo.title
      todo.editing = true
    },
    doneEdit(todo) {
      if (todo.title.trim() == '') {
        todo.title = this.beforeEditCache
      }
      todo.editing = false
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache
      todo.editing = false
    },
    
  },

  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  }

};
</script>

<style scoped> 
.todos {
display: grid; 
grid-template-columns:repeat(3, 1fr); grid-gap: 1rem;
} 
.todo {
border: 1px solid #ccc;
background: #41b883; 
padding: 1rem;
border-radius: 5px; 
text-align:
center; position: 
relative; cursor: pointer; 
}
.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; 
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
    }
  
 i { 
position: absolute;
bottom: 10px; 
right: 10px; 
color: #fff; 
cursor: pointer;
 } 

.legend {
display: flex; 
justify-content: 
space-around; 
margin-bottom: 1rem; 
}
.complete-box, .incomplete-box { 
display: inline-block; 
width: 10px;
height: 10px; 
}
.complete-box { 
background: #35495e; 
} 
.incomplete-box
{ background: #41b883; 
} 
.is-complete { 
color: #fff; 
background:#35495e; 
}
 @media (max-width: 500px) { 
.todos { 
grid-template-columns:1fr;
 }
  }
 </style>
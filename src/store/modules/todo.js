import axios from 'axios'

const state = {
    todos:[] //empty array which will hold all todos
}

//responsible for getting the data  [getting the state app]
const getters={
    allTodos:(state)=>{
        return state.todos
    }
}
//fetching todos using axios
const actions = {
    async fetchTodos({ commit }){
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        commit('setTodos', response.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    
        commit('removeTodo', id);
      },
      async updateTodo({ commit }, updatedTodo) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`, updatedTodo);
    
        commit('updateTodo', response.data);
      },
      async addTodo({commit},title){
        const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`,
        {title:title,completed:false})
  
        commit('addTodo',response.data)
    },
    async filterTodos({ commit }, event) {
        // Get the limit
        const limit = parseInt(event.target.options[event.target.options.selectedIndex].innerText);
        
        // Request
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    
        commit('setTodos', response.data);
      },
      updateTodos(context, todo) {
        axios.patch(`https://jsonplaceholder.typicode.com/todos` + todo.id, {
          title: todo.title,
          completed: todo.completed,
        })
          .then(response => {
            context.commit('updateTodo', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      },

}

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    removeTodo:(state,id)=> state.todos = state.todos.filter((todo) => todo.id !==id),
    updateTodo: (state, updatedTodo) => {
        // Find index
        const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);
    
        if (index !== -1) {
          state.todos.splice(index, 1, updatedTodo);
        }
    },
    addTodo:(state,newTodo) => state.todos.unshift(newTodo),
   
    updateTodos(state, todos) {
        const index = state.todos.findIndex(item => item.id == todos.id)
        state.todos.splice(index, 1, {
          'id': todos.id,
          'title': todos.title,
          'completed': todos.completed,
          'editing': todos.editing,
        })
      },  
    
}

export default {
    state, 
    getters, 
    actions,
    mutations
}
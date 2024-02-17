import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: [],
    isEdit: false,
    isSearch: false
  },
  getters: {
    allTodos: state => {
      return state.todos.filter((todo) => !todo.isCompleted)
    },
    completedTodos: state => {
      return state.todos.filter((todo) => todo.isCompleted)
    },
    searchUncompletedTodos: state => searchInput => {
      return state.todos.filter((todo) => todo.task.toLowerCase().includes(searchInput.toLowerCase()) && !todo.isCompleted)
    },
    searchCompletedTodos: state => searchInput => {
      return state.todos.filter((todo) => todo.task.toLowerCase().includes(searchInput.toLowerCase()) && todo.isCompleted)
    },
    findTodo: state => todoID => {
      return state.todos.find(todo => todo.id == todoID)
    },
    findTodoIndex: state => todoID => {
      return state.todos.findIndex(todo => todo.id == todoID)
    },
    isStorageExits: state => {
      if (typeof Storage === undefined) {
        alert("Browsur kamu tidak mendukung local storage");
        return false;
      }
      return true;
    },
  },
  mutations: {
    addTask: (state, todoObject) => {
      state.todos.unshift(todoObject)
    },
    addTaskToCompleted: (state, todoTarget) => {
      if (todoTarget == undefined) return

      todoTarget.isCompleted = true
    },
    undoTaskFromCompleted: (state, todoTarget) => {
      if (todoTarget == undefined) return

      todoTarget.isCompleted = false
    },
    removeTaskFromCompleted: (state, todoTarget) => {
      if (todoTarget == -1) return

      state.todos.splice(todoTarget, 1)
    },
    changeEditBool: state => {
      state.isEdit = !state.isEdit
    },
    editTask: (state, { todoTarget, todoIndex }) => {
      if (todoTarget == undefined) return

      todos.splice(todoIndex, 1, todoTarget)
    },
    changeSearchBool: state => {
      state.isSearch = !state.isSearch
    },
    saveData: (state) => {
      const parsed = JSON.stringify(state.todos)
      localStorage.setItem('todos', parsed)
    },
    loadDataFromStorage: state => {
      const serializedData = localStorage.getItem('todos')

      let data = JSON.parse(serializedData)

      if (data !== null) {
        for (const todo of data) {
          state.todos.push(todo)
        }
      }
    },
  },
  actions: {
  },
  modules: {
  }
})

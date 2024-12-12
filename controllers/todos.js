import { Todo } from '../models/todo.js'
import { fileManager } from '../utils/files.js'

class todoController {
    constructor(){
        this.initTodos()
    }

    async createTodo(req, res){
        const task = req.body.task
        const newTodo = new Todo(Math.random().toString(), task)
        this.TODOS.push(newTodo)
        await fileManager.writeFile('./data/todos.json', this.TODOS)
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    async initTodos(){
        const todosData = await fileManager.readFile('./data/todos.json')
        if(todosData !== null){
            this.TODOS = todosData
        } else {
            this.TODOS = []
        }
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    } 

    updateTodo(req, res){
    const todoId = req.params.id
    const updatedTask = req.body.task

    console.log(req.body)
    console.log(req.params)

    const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)

    if(todoIndex < 0){
        res.json({
            message: 'Could not find todo with such index'
        })
        throw new Error('Could not find todo')
    }

    this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask)
    res.json({
        message: 'todo is updated',
        updatedTask: this.TODOS[todoIndex]
    })
    }

    deleteTodo(req, res){
        const todoId = req.params.id
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)  

    if(todoIndex < 0){
        return res.status(404).json({
            message: 'Could not find todo with the given ID'
        })
    }

    this.TODOS.splice(todoIndex, 1);

    res.json({
        message: 'Todo deleted successfully!'
    })
    }
}

export const TodoController = new todoController()
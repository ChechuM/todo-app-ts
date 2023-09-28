import { type TODO_FILTERS } from './const'
export interface Todo {
  id: string
  title: string
  completed: boolean
}

// Buena práctica al tratar con tipos primitivos
// el extraerlo hace que el proyecto sea luego escalable por si tengo que cambiar el tipo luego más adelante -> entonces todas las flechas están apuntando al mismo sitio y, si hay que cambiar algo sólo se cambia en ese sitio y no hace falta hacer más modificaciones en todo el documento
export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>
export type TodoEdited = Omit<Todo, 'completed'>
// el contrario de Pick es el Omit

export type ListOfToDos = Todo[]

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

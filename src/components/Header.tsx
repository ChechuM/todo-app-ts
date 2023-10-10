import { type TodoTitle } from '../types'
import { CreateTodo } from './CreateTodo'
import tsLogo from '../imgs/tslogo.png'

interface Props {
  onAdded: (title: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAdded }) => {
  return (
    <header className="header">
        <h1>todo<img
        style={{ width: '60px', height: 'auto' }}
        src={tsLogo}
        alt='TypeScript Logo'/>
        </h1>
        <CreateTodo saveTodo={onAdded} />
    </header>
  )
}

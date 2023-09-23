import { type FilterValue } from '../types'
import { Filters } from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
  filterSelected: FilterValue
  handleFilterChange: (filter: FilterValue) => void
}

export const Footer: React.FC<Props> = ({
//   completedCount = 0,
  activeCount = 0,
  //   onClearCompleted,
  filterSelected,
  handleFilterChange
}) => {
  return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> pending tasks
            </span>
            <Filters
                filterSelected={filterSelected}
                onFilterChange={() => { handleFilterChange(filterSelected) }} />
        </footer>
  )
}

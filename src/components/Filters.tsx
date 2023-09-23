import { FILTERS_BUTTONS } from '../const'
import { type FilterValue } from '../types'

interface Props {
  // type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
  // es una forma dinámica de decirle que acceda a TODO_FILTERS, que cada key de dicho objeto tiene un tipo, y que dependiendo de esa key es el tipo que va a tener.
  // Si lo declaramos de manera explícita: filterSelected: 'all' | 'active' | 'completed', luego no es escalable si agregamos más tipos de filtros
  filterSelected: FilterValue
  onFilterChange: (filter: FilterValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
        <ul className="filters">
            {
                // Object.entries() transforma el objeto FILTERS_BUTTONS en un array para poder aplicarle el método map
                Object.entries(FILTERS_BUTTONS).map(([key, { literal, href }]) => {
                  // para no hacer todo un lío con la clase dinámica en medio del código html vamos a seleccionarla aquí que es más fácil:

                  // para cada elemento de los filtros -> primero defino si ha sido seleccionado -> el valor que devuelve esto es booleano
                  const isSelected = key === filterSelected
                  // luego en base a eso define el nombre de la clase -> si es true, la clase será selected, si no la clase es un string vaío
                  const className = isSelected ? 'selected' : ''

                  return (
                        <li key={key}>
                            <a
                            className={className}
                            href={href}
                            onClick={(evt) => {
                              evt.preventDefault()
                              // cuando hago click en los filtros se envían las palabras all, active o completed -> eso es lo que envía key as FilterValue -> es un string
                              // lo pongo como key as FilterValue para tiparlo
                              onFilterChange(key as FilterValue)
                            }}
                            >
                                {literal}
                            </a>
                        </li>
                  )
                })
            }
            {/* <li>
                <a
                className={`${filterSelected === 'all' ? 'selected' : ''}`}
                onClick={() => {
                  onFilterChange('all')
                }}
                >
                    Todos
                </a>
            </li>
            <li>
                <a
                className={`${filterSelected === 'active' ? 'selected' : ''}`}
                onClick={() => {
                  onFilterChange('active')
                }}
                >
                    Activos
                </a>
            </li>
            <li>
                <a
                className={`${filterSelected} === 'completed' ? 'selected' : ''`}
                onClick={() => {
                  onFilterChange('completed')
                }}
                >
                    Completed
                </a>
            </li> */}
        </ul>
  )
}

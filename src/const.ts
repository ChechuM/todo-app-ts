export const TODO_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const
// as const es una propiedad de TypeScript que hace que estas constantes declaradas sean sólo de lectura y no permite ser modificado

// aquí de forma visual vamos a crear los botones con un diccionario para poder aprovechar TS y sus features
export const FILTERS_BUTTONS = {
  [TODO_FILTERS.ALL]: {
    literal: 'All',
    href: `/?filter=${TODO_FILTERS.ALL}`
  },
  [TODO_FILTERS.ACTIVE]: {
    literal: 'Active',
    href: `/?filter=${TODO_FILTERS.ACTIVE}`
  },
  [TODO_FILTERS.COMPLETED]: {
    literal: 'Completed',
    href: `/?filter=${TODO_FILTERS.COMPLETED}`
  }
} as const

// Con a href se crean enlaces internos o externos en un documento HTML. Utilizado correctamente, el atributo href se integra perfectamente en tu página web y aparece ahí en forma de hipervínculo. Los visitantes pueden hacer clic sobre él para ir a otra página o a otro destino dentro de tu propia web.

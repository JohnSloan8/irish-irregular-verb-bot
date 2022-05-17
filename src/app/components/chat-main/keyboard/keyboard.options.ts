export const keyboardOptions = {
  'layout': {
    'default': [
      '{fada} a e i o u',
      '{urú} b c d f g p t',
      '{séimhiú} n m s r l h',
      '{enter} {space} {bksp}'
    ],
    'fada': [
      '{fada} á é í ó ú',
      '{urú} b c d f g p t',
      '{séimhiú} n m s r l h',
      '{enter} {space} {bksp}'
    ],
    'urú': [
      '{fada} a e i o u',
      '{urú} mb gc nd bhf ng bp dt',
      '{séimhiú} n m s r l h',
      '{enter} {space} {bksp}'
    ],
    'séimhiú': [
      '{fada} a e i o u',
      '{urú} bh ch dh fh gh bh th',
      '{séimhiú} n mh sh r l h',
      '{enter} {space} {bksp}'
    ]
  },
  'display': {
    '{bksp}': 'scrios',
    '{enter}': 'cuir',
    '{space}': 'spás',
    '{urú}': 'urú',
    '{séimhiú}': 'séimhiú',
    '{shift}': 'caipitliú',
    '{fada}': 'fada'
  },

  button: [
    {
      class: "fadas",
      buttons: "á é í ó ú"
    },
    {
      class: "urús",
      buttons: "mb gc nd bhf ng bp dt"
    },
    {
      class: "séimhiús",
      buttons: "bh ch dh fh gh bh th mh sh"
    },
    {
      class: "blanks",
      buttons: " "
    }
  ]
}


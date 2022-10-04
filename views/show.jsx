const React = require('react')
const Default = require('./layouts/default')

function Show ({bread, index}) {
      return (
<Default title={bread.name}>
  <h3>{bread.name}</h3>
  <p>
    and it
    {
      bread.hasGluten
      ? <span> does </span>
      : <span> does NOT </span>
    }
    have gluten.
  </p>
  <img src={bread.image} alt={bread.name} />
  
  <form action={'/breads/'} method="GET">
    <input type='submit' value="GO HOME"/>
  </form>

  <form action={`/breads/${index}/edit`} method="GET">
    <input type='submit' value="EDIT"/>
  </form>

  <form action={`/breads/${index}?_method=DELETE`} method="POST">
    <input type='submit' value="DELETE"/>
  </form>
</Default>

      )
  }
  

module.exports = Show

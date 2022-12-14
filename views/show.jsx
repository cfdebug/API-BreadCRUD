const React = require('react')
const Default = require('./layouts/default')

function Show ({bread, breadList}) {
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

  <ul>
    {
      bread.ingredients.map((ingredient) => {
        return(<li>{ingredient}</li>)
      })
    }
  </ul>

  <h5>{bread.getBakedBy()}</h5>

  <p>Other Breads By This Same Baker:</p>
  <ul>
    {
      breadList.map((breadType) => {
        if(bread.id != breadType.id){
        return(<li><a href={`/breads/${breadType.id}`}>{breadType.name}</a></li>)
        }
      })
    }
  </ul>

  <form className = 'bread-action' action={'/breads/'} method="GET">
    <input type='submit' value="GO HOME"/>
  </form>

  <form className = 'bread-action' action={`/breads/${bread.id}/edit`} method="GET">
    <input type='submit' value="EDIT"/>
  </form>

  <form className = 'bread-action' action={`/breads/${bread.id}?_method=DELETE`} method="POST">
    <input type='submit' value="DELETE"/>
  </form>
</Default>

      )
  }
  

module.exports = Show

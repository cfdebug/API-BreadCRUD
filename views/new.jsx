const React = require('react')
const Default = require('./layouts/Default')

function New () {
    return (
      <Default title="New Bread">
        <h2>Add a new bread</h2>
        <form action='/breads' method='POST'>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
          />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            id="image"
            pattern="https?://.+"
            title='Include http:// or https://'
            />
          <label htmlFor="ingredients">Ingredients separated by a comma</label>
          <input
            type="text"
            name="ingredients"
            id="ingredients"
            />
          <label htmlFor="hasGluten">Has Gluten?</label>
          <input
            type="checkbox"
            name="hasGluten"
            id="hasGluten"
            defaultChecked
          />
          <label htmlFor="baker">Recipe Created By</label>
          <select name="baker" id="baker">
            <option disabled selected value='Unknown'> -- select an option -- </option>
            <option value="Rachel">Rachel</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Chandler">Chandler</option>
            <option value="Ross">Ross</option>
            <option value="Phoebe">Phoebe</option>
          </select>
          <br />
          <input type="submit"/>
        </form>
        <div className="backButton">
            <a href="/breads"><button>Go back to the index</button></a>
        </div>

      </Default>
    )
}

module.exports = New


const React = require('react')
const Default = require('./layouts/default')

function notFound () {
    return(
    <Default title='Error 404'>
       <h1>Page Not Found!</h1>
       <h2>Hey Dum Dum! You Messed Up!</h2>
       <a href="/breads"><button>Go home</button></a> 
    </Default>
    )
}

module.exports = notFound
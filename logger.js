
'use strict'

exports = module.exports = class Logger {
    static log( data ) {
        const now = new Date( )
        console.warn( `[${ now.toLocaleTimeString( ) }] ${ data }` )
    }
}

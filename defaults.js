
const pathlib = require( 'path' )

exports = module.exports = {
    host:     'localhost',
    password: 'admin',
    path:     process.cwd( ),
    port:     4502,
    protocol: 'http',
    username: 'admin',
    service:  'crx/packmgr/service.jsp',

    get auth( ) {
        with( this ) {
            return `${ username }:${ password }`
        }
    },

    get packageName( ) {
        with( this ) {
            const now = new Date( )
            with( now ) {
                return `${ getTime( ) }-${ pathlib.basename( path ) }.zip`
                // return `${ [
                //     getFullYear( ),
                //     getMonth( ) + 1,
                //     getDate( ),
                //     getHours( ),
                //     getMinutes( ),
                //     getSeconds( ),
                //     pathlib.basename( path )
                // ].join( '-' )}.zip`
            }
        }
    },

    get url( ) {
        with( this ) {
            return `${ protocol }://${ host }:${ port }/${ service }`
        }
    }
}

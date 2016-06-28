
'use strict'

const archiver = require( 'archiver' )
const chokidar = require( 'chokidar' )
const FormData = require( 'form-data' )
const defaults = require( './defaults' )
const logger   = require( './logger' )
const fs       = require( 'fs' )

exports = module.exports = class Deployer {
    constructor( options ) {
        this.options = Object.assign( defaults, options )
        console.log( this.options.packageName )
    }

    _deployArchiveStream( stream ) {
        const form = new FormData( )
        form.append( 'install', 'true' )
        form.append( 'file', stream )
        form.append( 'name', this.options.packageName )
        form.submit( {
            host: this.options.host,
            path: this.options.service,
            auth: this.options.auth
        }, ( err, res = {
            statusCode:    err.code,
            statusMessage: err.message
        } ) => {
            const status = ( err || ( res && res.statusCode != 200 ) ) ?
                'failed':
                'succeeded'

            logger.log( `package installation ${ status } (${ res.statusCode }: ${ res.statusMessage })` )
        } )
    }

    _getArchiveStream( ) {
        const archive = archiver.create( 'zip' )
        let count = 0

        return archive
            .bulk( {
                cwd: this.options.path,
                src: [ '**' ]
            } )
            .on( 'end', e => logger.log( `added ${ count } files to package` ) )
            .on( 'entry', e => ++ count )
            .finalize( )
    }

    deploy( ) {
        this._deployArchiveStream( this._getArchiveStream( ) )
    }

    watch( ) {
        const watcher = chokidar.watch( this.options.path )
        watcher.on( 'change', ( ) => {
            logger.log( 'detected file change' )
            this.deploy( )
        } )
    }
}

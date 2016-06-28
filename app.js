
const Deployer = require( './index.js' )
const d = new Deployer( {
    host: 'httpbin.org',
    service: '/status/401'
} )

d.deploy( )

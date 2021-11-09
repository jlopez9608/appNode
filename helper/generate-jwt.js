const jwt = require('jsonwebtoken');
const getJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2h'
        }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'Fail to get JWT' );
            }else{
                resolve( token )
            }
        })  
    })

}


module.exports = { getJWT }
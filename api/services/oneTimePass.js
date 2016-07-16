module.exports = {

    check: function(token) {

        sails.log('oneTimePassService ' + token)

        Token.findOne({secret:token}).then(function afterFind(err, token){

            if(err){
                sails.log('TokenService:check - Could not find token with that secret')
                return false
            }
            if(token){
                return true
            }
            return false

        });


    }
};
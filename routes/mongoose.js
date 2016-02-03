/**
 * Created by LG on 2016-02-02.
 */
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/member');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback() {
    console.log("open");
});

var memberSchema = mongoose.Schema({
    id: 'string',
    password: 'string',
    email: 'string',
    name: 'string'
});

module.exports.Member = mongoose.model('Member', memberSchema);


/*Member.findOne({id: id}, function (err, member) {
    if (err) return handleError(Err);

    if (member == null) {
        var myMember = new Member({id: id, password: passwd, email: email, name: name});
        myMember.save(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('member is inserted');
            }
        });
    }
    else {
        console.log("id existing");
    }
});*/


//module.exports = Member;

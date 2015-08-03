Raffles = new Meteor.Collection('raffles');

Router.configure({
    layoutTemplate: 'AppLayout'
});


Router.route('/', {
    name: 'raffleList',
    data: function() {
        var raffleList = Raffles.find({});
        return {
            raffles: raffleList
        }
    }
});

Router.route('/raffle/:_id', function () {
    var raffle = Raffles.findOne(this.params._id); //new Meteor.Collection.ObjectID
    this.render('raffle', { data: raffle });
});
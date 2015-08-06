Raffles = new Meteor.Collection('raffles');

Router.configure({
    layoutTemplate: 'appLayout',
    yieldTemplates: {
        'header': {to: 'header'}
    }
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

Router.route('/raffle/:_id', {
    name: 'raffle',
    yieldTemplates: {
        'header': {to: 'header'}
    },
    data: function () {
        return Raffles.findOne(this.params._id); //new Meteor.Collection.ObjectID
    }
});
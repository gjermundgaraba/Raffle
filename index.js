Raffles = new Meteor.Collection('raffles');
Users = new Meteor.Collection('users');

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
        return Raffles.findOne(this.params._id);
    }
});

Router.route('/user-manager/', {
    name: 'userManager',
    yieldTemplates: {
        'header': {to: 'header'}
    },
    data: function() {
        var userList = Users.find({});
        return {
            users: userList
        }
    }
});

if (Meteor.isClient) {
    Template.registerHelper('isMaster', function () {
        return Session.get('RaffleMaster');
    });

    Template.registerHelper('getNameFromUserId', function (userId) {
        return Users.findOne(userId).name;
    });
}
Raffles = new Meteor.Collection('raffles');
Users = new Meteor.Collection('users');
Settings = new Meteor.Collection('settings');

if (Meteor.isServer) {
    Meteor.publish('users', function () {
        return Users.find();
    });

    Meteor.publish('raffles', function () {
        return Raffles.find();
    });

    Meteor.publish('settings', function () {
        return Settings.find();
    })
}

if (Meteor.isClient) {
    Meteor.subscribe('users');
    Meteor.subscribe('raffles');
    Meteor.subscribe('settings');
}

Router.configure({
    layoutTemplate: 'appLayout',
    yieldTemplates: {
        'header': {to: 'header'}
    }
});


Router.route('/', {
    name: 'raffleList',
    waitOn: function () {
        return Meteor.subscribe('raffles');
    },
    data: function() {
        var raffleList = Raffles.find({}, {sort: {raffleDate: -1}});
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
    waitOn: function () {
        return Meteor.subscribe('raffles');
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
    waitOn: function () {
        return Meteor.subscribe('users');
    },
    data: function() {
        var userList = Users.find({}, {sort: {name: 1}});
        return {
            users: userList
        }
    }
});

Router.route('/settings/', {
    name: 'settings',
    yieldTemplates: {
        'header': {to: 'header'}
    },
    waitOn: function () {
        return Meteor.subscribe('settings');
    },
    data: function() {
        var allSettings = Settings.find({});
        return {
            settingsObj: allSettings.fetch()
        }
    }
});

if (Meteor.isClient) {
    Template.registerHelper('isMaster', function () {
        return Session.get('RaffleMaster');
    });

    Template.registerHelper('getNameFromUserId', function (userId) {
        if (typeof Users !== 'undefined' && Users != null) {
            var user = Users.findOne(userId);
            if (user) {
                return user.name;
            }
        }
    });
}

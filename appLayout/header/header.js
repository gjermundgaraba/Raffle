if (Meteor.isClient) {
    Session.setDefault('RaffleMaster', false);

    Template.header.events({
        'click #rafflemasterlogin': function () {
            Session.set('RaffleMaster', !Session.get('RaffleMaster'));
        }
    })
}
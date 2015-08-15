if (Meteor.isClient) {
    Session.setDefault('RaffleMaster', false);

    Template.header.events({
        'click #rafflemasterlogin': function () {

            if (!Session.get('RaffleMaster')) {
                // We are not Raffle Master, ask user if he really wants to be.
                if(confirm('Are you sure that you want to be Raffle Master?')) {
                    Session.set('RaffleMaster', true);
                }
            } else {
                // We are Raffle Master, so lets remove it.
                Session.set('RaffleMaster', false);
            }
        },
        'click #user-manager': function () {
            Router.go('/user-manager');
        }
    })
}
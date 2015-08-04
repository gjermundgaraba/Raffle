if (Meteor.isClient) {
    Session.setDefault('numberOfTicketsSelected', 1);


    Template.raffle.helpers({
        'numberOfTicketsSelected': function () {
            return Session.get('numberOfTicketsSelected');
        },
        'anyWinners': function () {
            console.log(this);
            return this.winners.length;
        }
    });

    Template.raffle.events({
        'click .mdl-menu__item': function (event) {
            Session.set('numberOfTicketsSelected', event.target.value);
        }
    });
}
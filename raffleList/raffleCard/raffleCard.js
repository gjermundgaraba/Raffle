if (Meteor.isClient) {
    Template.raffleCard.helpers({

        raffleDateFormatted: function () {
            return moment(this.raffleDate).format('Do MMMM');
        },
        numberOfParticipants: function () {
            return this.participants.length + this.winners.length;
        },
        'anyWinners': function () {
            return this.winners.length > 0;
        }
    });
}

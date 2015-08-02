if (Meteor.isClient) {
    Template.raffleCard.helpers({

        header: function (raffleDate) {
            return moment(raffleDate).format('Do MMMM');
        }

    });
}

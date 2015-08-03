if (Meteor.isClient) {
    Template.raffleList.events({
        'click #addRaffle': function () {
            Raffles.insert({
                raffleDate: new Date(),
                winner: 'kabarsken'
            }, function (error, id) {
                if (!error) {
                    Router.go('/raffle/' + id);
                }
            });
        }
    })
}
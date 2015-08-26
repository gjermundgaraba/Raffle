if (Meteor.isClient) {

    Template.raffleList.events({
        'click #addRaffle': function () {
            var emptyRaffle = {
                done: false,
                raffleDate: new Date(),
                winners: [],
                participants: [],
                losers: []
            };

            Raffles.insert(emptyRaffle, function (error, id) {
                if (!error) {
                    Router.go('/raffle/' + id);
                }
            });
        }
    })

}
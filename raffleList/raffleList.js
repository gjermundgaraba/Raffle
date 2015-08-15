if (Meteor.isClient) {

    Template.raffleList.events({
        'click #addRaffle': function () {
            Raffles.insert({
                done: false,
                raffleDate: new Date(),
                winners: [
                ],
                participants: [
                ]
            }, function (error, id) {
                if (!error) {
                    Router.go('/raffle/' + id);
                }
            });
        }
    })

}
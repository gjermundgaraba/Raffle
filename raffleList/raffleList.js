if (Meteor.isClient) {
    Template.raffleList.helpers({
        'isMaster': function () {
            return Session.get('RaffleMaster');
        }
    });

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
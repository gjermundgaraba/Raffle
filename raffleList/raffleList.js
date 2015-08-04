if (Meteor.isClient) {
    Template.raffleList.events({
        'click #addRaffle': function () {
            Raffles.insert({
                raffleDate: new Date(),
                winners: [
                    {
                        name: 'Gjermund'
                    },
                    {
                        name: 'Knut'
                    }
                ],
                participants: [
                    {
                        name: 'Gjermund',
                        tickets: 2
                    },
                    {
                        name: 'Knut',
                        tickets: 3
                    },
                    {
                        name: 'Dag Ole',
                        tickets: 1
                    }
                ]
            }, function (error, id) {
                if (!error) {
                    Router.go('/raffle/' + id);
                }
            });
        }
    })
}
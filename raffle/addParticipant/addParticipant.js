(function () {
    if (Meteor.isClient) {

        function getPossibleUsers() {
            if (this.participants) {
                var participantUserIdList = this.participants.map(function (currentParticipant) {
                    return currentParticipant.userId;
                });

                var winnerUserIdList = this.winners.map(function (currentWinner) {
                    return currentWinner.userId;
                });

                var impossibleUserIds = participantUserIdList.concat(winnerUserIdList);

                return Users.find({
                    '_id': {
                        '$nin': impossibleUserIds
                    }
                }, {sort: {name: 1}});
            }
        }

        function submitNewParticipant(event) {
            event.preventDefault();

            var participant = {
                userId: event.target.participantId.value,
                tickets: event.target.numberOfTickets.value
            };

            Raffles.update({ _id: this._id }, {
                $push: {
                    participants: participant
                }
            });

            event.target.reset();
        }

        Template.addParticipant.helpers({
            'getPossibleUsers': getPossibleUsers
        });

        Template.raffle.events({
            'submit .new-raffle-participant': submitNewParticipant
        });

    }
})();
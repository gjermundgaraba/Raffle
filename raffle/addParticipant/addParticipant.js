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

                var loserUserIdList = this.losers.map(function (currentLoser) {
                    return currentLoser.userId;
                });

                var impossibleUserIds = participantUserIdList.concat(winnerUserIdList).concat(loserUserIdList);

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

            if (typeof participant.userId !== 'undefined' && participant.userId !== ''
                && typeof participant.tickets !== 'undefined' && participant.tickets !== '') {
                Meteor.call('addParticipant', this._id, participant);
            } else {
                alert('User dont exist!');
            }



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

Meteor.methods({
    addParticipant: function (raffleId, participant) {
        Raffles.update(raffleId, {
            $push: {
                participants: participant
            }
        });
    }
});
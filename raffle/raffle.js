(function () {
    if (Meteor.isClient) {

        function getNumberOfTicketsInPlay() {
            return RAFFLE_COMMON.getNumberOfTickets(this.participants);
        }

        function getTotalNumberOfTickets() {
            var numberOfTickets = 0;

            numberOfTickets += RAFFLE_COMMON.getNumberOfTickets(this.participants);
            numberOfTickets += RAFFLE_COMMON.getNumberOfTickets(this.winners);
            numberOfTickets += RAFFLE_COMMON.getNumberOfTickets(this.losers);

            return numberOfTickets;
        }

        function deleteParticipant() {
            var parentData = Template.parentData();


            var participantsCopy = parentData.participants.slice();
            for (var i = 0; i < participantsCopy.length; ++i) {
                var currentParticipant = participantsCopy[i];

                if (currentParticipant.userId === this.userId) {
                    participantsCopy.splice(i, 1);
                    break; // Should only ever be one with that userId, lets stop here
                }
            }

            Meteor.call('updateParticipants', parentData._id, participantsCopy);
        }

        function deleteRaffle() {
            var confirmDelete = confirm('Are you sure you want to delete this raffle?');

            if (confirmDelete) {
                Meteor.call('deleteRaffle', this._id);
                Router.go('/');
            }
        }

        function undoFinishRaffle() {
            console.log('Undo Finish Raffle');
            Meteor.call('updateRaffleDoneStatus', this._id, false);
        }

        function finishRaffle() {
            var confirmFinish = confirm('Are you sure you want to finish this raffle?');

            if (confirmFinish) {
                Meteor.call('updateRaffleDoneStatus', this._id, true);
            }
        }

        Template.raffle.helpers({
            'raffleDateFormatted': RAFFLE_COMMON.raffleDateFormatted,
            'anyWinners': RAFFLE_COMMON.anyWinners,
            'anyLosers': RAFFLE_COMMON.anyLosers,
            'isDone': RAFFLE_COMMON.isDone,
            'numberOfParticipants': RAFFLE_COMMON.getNumberOfActiveParticipants,
            'getNumberOfTicketsInPlay': getNumberOfTicketsInPlay,
            'getTotalNumberOfParticipants': RAFFLE_COMMON.getTotalNumberOfParticipants,
            'getTotalNumberOfTickets': getTotalNumberOfTickets
        });

        Template.raffle.events({
            'click #deleteParticipant': deleteParticipant,
            'click #deleteRaffle': deleteRaffle,
            'click #undoFinishRaffle': undoFinishRaffle,
            'click #finishRaffle': finishRaffle
        });
    }
})();

Meteor.methods({
    deleteRaffle: function(raffleId) {
        Raffles.remove(raffleId);
    },
    updateParticipants: function (raffleId, updatedParticipants) {
        Raffles.update(raffleId, {
            $set: {
                participants: updatedParticipants
            }
        });
    },
    updateRaffleDoneStatus: function (raffleId, updatedDoneStatus) {
        Raffles.update(raffleId, {
            $set: {
                done: updatedDoneStatus
            }
        });
    }
});
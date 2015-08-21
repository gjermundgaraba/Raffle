(function () {
    if (Meteor.isClient) {

        function getNumberOfTicketsInPlay() {
            if (this.participants) {
                var numberOfTickets = 0;

                for (var i = 0; i < this.participants.length; ++i) {
                    numberOfTickets += parseInt(this.participants[i].tickets);
                }

                return numberOfTickets;
            }
        }

        function getTotalNumberOfTickets() {
            var numberOfTickets = 0;
            numberOfTickets += getNumberOfTicketsInPlay.apply(this);

            if (this.winners) {
                for (var i = 0; i < this.winners.length; ++i) {
                    numberOfTickets += parseInt(this.winners[i].tickets);
                }
            }

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

            Raffles.update({_id: parentData._id}, {
                $set: {
                    participants: participantsCopy
                }
            });
        }

        function deleteWinner() {
            var parentData = Template.parentData();

            var winnersCopy = parentData.winners.slice();
            for (var i = 0; i < winnersCopy.length; ++i) {
                var currentWinner = winnersCopy[i];

                if (currentWinner.userId === this.userId) {
                    winnersCopy.splice(i, 1);
                    break; // Should only ever be one with that id, lets stop here
                }
            }

            Raffles.update({_id: parentData._id}, {
                $set: {
                    winners: winnersCopy
                }
            });
        }

        function deleteRaffle() {
            var confirmDelete = confirm('Are you sure you want to delete this raffle?');

            if (confirmDelete) {
                Raffles.remove(this._id);
                Router.go('/');
            }
        }

        function undoFinishRaffle() {
            console.log('Undo Finish Raffle');

            Raffles.update({ _id: this._id }, {
                $set: {
                    done: false
                }
            });
        }

        function finishRaffle() {
            var confirmFinish = confirm('Are you sure you want to finish this raffle?');

            if (confirmFinish) {
                Raffles.update({ _id: this._id }, {
                    $set: {
                        done: true
                    }
                });
            }
        }

        Template.raffle.helpers({
            'anyWinners': RAFFLE_COMMON.anyWinners,
            'isDone': RAFFLE_COMMON.isDone,
            'numberOfParticipants': RAFFLE_COMMON.getNumberOfActiveParticipants,
            'getNumberOfTicketsInPlay': getNumberOfTicketsInPlay,
            'getTotalNumberOfParticipants': RAFFLE_COMMON.getTotalNumberOfParticipants,
            'getTotalNumberOfTickets': getTotalNumberOfTickets
        });

        Template.raffle.events({
            'click #deleteParticipant': deleteParticipant,
            'click #deleteWinner': deleteWinner,
            'click #deleteRaffle': deleteRaffle,
            'click #undoFinishRaffle': undoFinishRaffle,
            'click #finishRaffle': finishRaffle
        });
    }
})();
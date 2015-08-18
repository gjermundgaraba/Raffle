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
                });
            }
        }

        function drawWinner() {
            var pool = [];

            for (var i = 0; i < this.participants.length; ++i) {
                var participant = this.participants[i];

                for (var j = 0; j < parseInt(participant.tickets); ++j) {
                    pool.push(participant);
                }
            }

            if (pool.length === 0) {
                return;
            }

            var winningNumber = drawWinnerNumber(pool);
            var winner = pool[winningNumber];
            var winnerName = Users.findOne(winner.userId).name;

            // Play awesome drum roll to get people excited
            var audio = new Audio('/drumroll.mp3');
            var that = this;
            audio.addEventListener('ended', function() {
                updateWinners(that, winner);

                showWinner(winnerName);
            }, false);
            audio.play();

            function showWinner(winnerName) {
                var winnerAnnouncementPopupElement = $('#winner-announcement-popup');
                winnerAnnouncementPopupElement.html('<h1>' + winnerName + '</h1>');
                if (winnerAnnouncementPopupElement.length) {
                    $.magnificPopup.open({
                        items: {
                            src: winnerAnnouncementPopupElement
                        },
                        type: 'inline',
                        closeOnContentClick: true
                    });
                }
            }

            function updateWinners(context, winner) {
                context.winners.push(winner);
                removeWinnerFromParticipants(context.participants, winner);
                Raffles.update({_id: context._id}, {
                    $set: {
                        winners: context.winners,
                        participants: context.participants
                    }
                });
            }

            function drawWinnerNumber(pool) {
                return getRandomInt(0, pool.length);
            }

            function removeWinnerFromParticipants(participants, winner) {
                for (var k = 0; k < participants.length; ++k) {
                    var currentParticipant = participants[k];
                    if (currentParticipant.userId === winner.userId) {
                        participants.splice(k, 1);
                        return;
                    }
                }
            }

            // Returns a random integer between min (included) and max (excluded)
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min)) + min;
            }
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
            'numberOfTickets': getNumberOfTicketsInPlay,
            'getPossibleUsers': getPossibleUsers
        });

        Template.raffle.events({
            'click .mdl-button--big-ass-button': drawWinner,
            'click #deleteParticipant': deleteParticipant,
            'click #deleteWinner': deleteWinner,
            'submit .new-raffle-participant': submitNewParticipant,
            'click #deleteRaffle': deleteRaffle,
            'click #finishRaffle': finishRaffle,
            'click #undoFinishRaffle': undoFinishRaffle
        });
    }
})();
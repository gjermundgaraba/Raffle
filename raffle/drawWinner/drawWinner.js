(function () {
    if (Meteor.isClient) {
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

        Template.drawWinner.events({
            'click #drawWinnerButton': drawWinner
        });

    }
})();
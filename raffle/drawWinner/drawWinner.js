(function () {
    if (Meteor.isClient) {
        function drawWinner() {
            var winner = DRAW_LOGIC.drawUser(this.participants);
            if (!winner) {
                return;
            }

            var winnerName = Users.findOne(winner.userId).name;

            // Play awesome drum roll to get people excited
            var audio = new Audio('/drumroll.mp3');
            var that = this;
            audio.addEventListener('ended', function() {
                that.winners.push(winner);
                Meteor.call('updateWinnersAndParticipants', that._id, that.winners, that.participants);

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
            }, false);

            audio.play(); // Will update users and show winner after it is done
        }

        function drawButtonIsDisabled () {
            if (RAFFLE_COMMON.numberOfTicketsSettingActivated()) {
                var numberOfTicketsForOneItemSetting = Settings.findOne({
                    settingsName: 'numberOfTicketsForOneItem'
                });

                var totalNumberOfTickets = RAFFLE_COMMON.getTotalNumberOfTickets.call(this);
                var numberOfWinners = this.winners.length;
                var numberOfTicketsForOneItem = numberOfTicketsForOneItemSetting.value;

                var numberOfItems = (Math.floor(totalNumberOfTickets / numberOfTicketsForOneItem) - numberOfWinners);

                return (numberOfItems <= 0);
            } else {
                return false;
            }
        }

        Template.drawWinner.helpers({
            'drawButtonIsDisabled': drawButtonIsDisabled
        });

        Template.drawWinner.events({
            'click #drawWinnerButton': drawWinner
        });
    }
})();

Meteor.methods({
    updateWinnersAndParticipants: function (raffleId, updatedWinners, updatedParticipants) {
        Raffles.update(raffleId, {
            $set: {
                winners: updatedWinners,
                participants: updatedParticipants
            }
        });
    }
});
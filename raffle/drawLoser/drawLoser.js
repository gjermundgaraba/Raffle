(function () {
    if (Meteor.isClient) {
        function drawLoser() {
            var loser = DRAW_LOGIC.drawUser(this.participants);
            if (!loser) {
                return;
            }

            var loserName = Users.findOne(loser.userId).name;

            // Play awesome drum roll to get people excited
            var audio = new Audio('/drumroll.mp3');
            var that = this;
            audio.addEventListener('ended', function() {
                that.losers.push(loser);
                Meteor.call('updateLosersAndParticipants', that._id, that.losers, that.participants);

                var winnerAnnouncementPopupElement = $('#winner-announcement-popup');
                winnerAnnouncementPopupElement.html('<h1>' + loserName + '</h1>');
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

        Template.drawLoser.events({
            'click #drawLoserButton': drawLoser
        });
    }
})();

Meteor.methods({
    updateLosersAndParticipants: function (raffleId, updatedLosers, updatedParticipants) {
        Raffles.update(raffleId, {
            $set: {
                losers: updatedLosers,
                participants: updatedParticipants
            }
        });
    }
});
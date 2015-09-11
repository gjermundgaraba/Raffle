(function() {
    if (Meteor.isClient) {
        function deleteWinner() {
            var parentData = Template.parentData();

            for (var i = 0; i < parentData.winners.length; ++i) {
                var currentWinner = parentData.winners[i];

                if (currentWinner.userId === this.userId) {
                    parentData.winners.splice(i, 1);
                    break; // Only one
                }
            }

            Meteor.call('updateWinners', parentData._id, parentData.winners);
        }

        Template.winnerTable.events({
            'click #deleteWinner': deleteWinner
        });
    }
})();

Meteor.methods({
    updateWinners: function(raffleId, updatedWinners) {
        Raffles.update(raffleId, {
            $set: {
                winners: updatedWinners
            }
        });
    }
});
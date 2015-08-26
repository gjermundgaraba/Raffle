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

            Raffles.update({_id: parentData._id}, {
                $set: {
                    winners: parentData.winners
                }
            });
        }

        Template.winnerTable.events({
            'click #deleteWinner': deleteWinner
        });
    }
})();
(function() {
    if (Meteor.isClient) {
        function deleteLoser() {
            var parentData = Template.parentData();

            for (var i = 0; i < parentData.losers.length; ++i) {
                var currentLoser = parentData.losers[i];

                if (currentLoser.userId === this.userId) {
                    parentData.losers.splice(i, 1);
                    break; // Only one
                }
            }

            Meteor.call('updateLosers', parentData._id, parentData.losers);
        }

        Template.losersTable.events({
            'click #deleteLoser': deleteLoser
        });
    }
})();

Meteor.methods({
    updateLosers: function(raffleId, updatedLosers) {
        Raffles.update(raffleId, {
            $set: {
                losers: updatedLosers
            }
        });
    }
});
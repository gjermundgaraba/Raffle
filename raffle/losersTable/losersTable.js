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

            Raffles.update({_id: parentData._id}, {
                $set: {
                    losers: parentData.losers
                }
            });
        }

        Template.losersTable.events({
            'click #deleteLoser': deleteLoser
        });
    }
})();
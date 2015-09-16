(function () {
    if (Meteor.isClient) {

        function numberOfItemsLeftInRaffle() {
            var numberOfTicketsForOneItemSetting = Settings.findOne({
                settingsName: 'numberOfTicketsForOneItem'
            });

            var totalNumberOfTickets = RAFFLE_COMMON.getTotalNumberOfTickets.call(this);
            var numberOfWinners = this.winners.length;
            var numberOfTicketsForOneItem = numberOfTicketsForOneItemSetting.value;

            return (Math.floor(totalNumberOfTickets / numberOfTicketsForOneItem) - numberOfWinners);
        }

        function itemName() {
            if (numberOfItemsLeftInRaffle.call(this) === 1) {
                var itemNameSingularSetting = Settings.findOne({
                    settingsName: 'itemNameSingular'
                });

                return itemNameSingularSetting.value;
            } else {
                var itemNamePluralSetting = Settings.findOne({
                    settingsName: 'itemNamePlural'
                });

                return itemNamePluralSetting.value;
            }
        }

        Template.numberOfItemsAvailable.helpers({
            'numberOfItemsLeftInRaffle': numberOfItemsLeftInRaffle,
            'itemName': itemName
        });
    }
})();
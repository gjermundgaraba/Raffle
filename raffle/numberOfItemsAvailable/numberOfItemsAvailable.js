(function () {
    if (Meteor.isClient) {

        function numberOfItemsLeftInRaffle() {
            var numberOfTicketsForOneItemSetting = Settings.findOne({
                settingsName: 'numberOfTicketsForOneItem'
            });

            var maxItems = Settings.findOne({
                settingsName: 'maxNumberOfItems'
            });

            var totalNumberOfTickets = RAFFLE_COMMON.getTotalNumberOfTickets.call(this);
            var numberOfWinners = this.winners.length;
            var numberOfTicketsForOneItem = numberOfTicketsForOneItemSetting.value;

            var numberOfItemsLeftInRaffle = (Math.floor(totalNumberOfTickets / numberOfTicketsForOneItem) - numberOfWinners);

            if (typeof maxItems !== 'undefined' && parseInt(maxItems.value) > 0 && numberOfItemsLeftInRaffle > parseInt(maxItems.value)) {
                numberOfItemsLeftInRaffle = parseInt(maxItems.value);
            }

            return numberOfItemsLeftInRaffle;
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
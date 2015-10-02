RAFFLE_COMMON = (function () {

    var raffleCommondModule = {};

    raffleCommondModule.isDone = function () {
        return this.done;
    };

    raffleCommondModule.anyWinners = function () {
        return this.winners.length > 0;
    };

    raffleCommondModule.severalWinners = function () {
        return this.winners.length > 1;
    };

    raffleCommondModule.getTotalNumberOfParticipants = function () {
        var totalNumberOfParticipants = 0;

        totalNumberOfParticipants += this.participants.length;
        totalNumberOfParticipants += this.winners.length;
        totalNumberOfParticipants += this.losers.length;

        return totalNumberOfParticipants;
    };

    raffleCommondModule.raffleDateFormatted = function () {
        return moment(this.raffleDate).format('Do MMMM');
    };

    raffleCommondModule.getNumberOfActiveParticipants = function () {
        return this.participants.length;
    };

    raffleCommondModule.anyLosers = function () {
        return this.losers.length;
    };

    raffleCommondModule.getNumberOfTickets = function (users) {
        var numberOfTickets = 0;

        if (users) {
            for (var i = 0; i < users.length; ++i) {
                numberOfTickets += parseInt(users[i].tickets);
            }
        }

        return numberOfTickets;
    };

    raffleCommondModule.getTotalNumberOfTickets = function () {
        var numberOfTickets = 0;

        numberOfTickets += raffleCommondModule.getNumberOfTickets(this.participants);
        numberOfTickets += raffleCommondModule.getNumberOfTickets(this.winners);
        numberOfTickets += raffleCommondModule.getNumberOfTickets(this.losers);

        return numberOfTickets;
    };

    raffleCommondModule.numberOfTicketsSettingActivated = function () {
        var activateNumberOfTicketsForItemSettings = Settings.findOne({
            settingsName: 'activateNumberOfTicketsForItem'
        });

        return activateNumberOfTicketsForItemSettings.value;
    };

    return raffleCommondModule;

})();

DRAW_LOGIC = (function () {

    var drawLogic = {};

    function drawWinnerNumber(pool) {
        return getRandomInt(0, pool.length);
    }

    // Returns a random integer between min (included) and max (excluded)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function removeUserFromList(users, userToRemove) {
        for (var k = 0; k < users.length; ++k) {
            var currentUser = users[k];
            if (currentUser.userId === userToRemove.userId) {
                users.splice(k, 1);
                return;
            }
        }
    }


    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    /*
     * Returns the user that was drawn
     *
     * Will return undefined if there are no tickets (or users) to be drawn from
     *
     * Will remove the user from the collection that is sent in
     */
    drawLogic.drawUser = function (users) {
        var pool = [];

        for (var i = 0; i < users.length; ++i) {
            var user = users[i];

            for (var j = 0; j < parseInt(user.tickets); ++j) {
                pool.push(user);
            }
        }

        if (pool.length === 0) {
            return;
        }

        pool = shuffle(pool);
        var winnerNumber = drawWinnerNumber(pool);
        var winner = pool[winnerNumber];

        removeUserFromList(users, winner);

        return winner;
    };


    return drawLogic;

})();

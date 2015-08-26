RAFFLE_COMMON = (function () {

    var raffleCommondModule = {};

    raffleCommondModule.isDone = function () {
        return this.done;
    };

    raffleCommondModule.anyWinners = function () {
        if (this.winners) {
            return this.winners.length > 0;
        }
    };

    raffleCommondModule.severalWinners = function () {
        if (this.winners) {
            return this.winners.length > 1;
        }
    };

    raffleCommondModule.getTotalNumberOfParticipants = function () {
        var totalNumberOfParticipants = 0;

        if (this.participants) {
            totalNumberOfParticipants += this.participants.length;
        }

        if (this.winners) {
            totalNumberOfParticipants += this.winners.length;
        }

        if (this.losers) {
            totalNumberOfParticipants += this.losers.length;
        }

        return totalNumberOfParticipants;
    };

    raffleCommondModule.raffleDateFormatted = function () {
        return moment(this.raffleDate).format('Do MMMM');
    };

    raffleCommondModule.getNumberOfActiveParticipants = function () {
        if (this.participants) {
            return this.participants.length;
        }
    };

    raffleCommondModule.anyLosers = function () {
        if (this.losers) {
            return this.losers.length;
        }
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

        var winnerNumber = drawWinnerNumber(pool);
        var winner = pool[winnerNumber];

        removeUserFromList(users, winner);

        return winner;
    };

    return drawLogic;

})();
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
        if (this.participants && this.winners) {
            return this.participants.length + this.winners.length;
        }
    };

    raffleCommondModule.raffleDateFormatted = function () {
        return moment(this.raffleDate).format('Do MMMM');
    };

    raffleCommondModule.getNumberOfActiveParticipants = function () {
        if (this.participants) {
            return this.participants.length;
        }
    };

    return raffleCommondModule;

})();
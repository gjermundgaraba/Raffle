STATISTICS_COMMON = (function () {
    var statisticsCommonModule = {};

    statisticsCommonModule.findUserInUserStats = function(id, users) {
        for (var i = 0; i < users.length; ++i) {
            if (users[i]._id === id) {
                return users[i];
            }
        }
    };

    statisticsCommonModule.generateUsersStatistics = function(raffles) {
        var usersWithStats = [];

        for (var i = 0; i < raffles.length; ++i) {
            var currentRaffle = raffles[i];

            for (var j = 0; j < currentRaffle.winners.length; ++j) {
                var winner = findOrInitiateUserInUsersWithStats(currentRaffle.winners[j].userId, usersWithStats);

                winner.numberOfTimesParticipated += 1;
                winner.numberOfTimesWon += 1;
                winner.numberOfTickets += currentRaffle.winners[j].tickets;
            }

            for (var k = 0; k < currentRaffle.losers.length; ++k) {
                var loser = findOrInitiateUserInUsersWithStats(currentRaffle.losers[k].userId, usersWithStats);

                loser.numberOfTimesParticipated += 1;
                loser.numberOfTimesLost += 1;
                loser.numberOfTickets += currentRaffle.losers[k].tickets;
            }

            for (var l = 0; l < currentRaffle.participants.length; ++l) {
                var participant = findOrInitiateUserInUsersWithStats(currentRaffle.participants[l].userId, usersWithStats);

                participant.numberOfTimesParticipated += 1;
                participant.numberOfTickets += currentRaffle.participants[l].tickets;
            }
        }

        return usersWithStats;
    };

    function findOrInitiateUserInUsersWithStats(id, usersWithStats) {
        var user;

        for (var i = 0; i < usersWithStats.length; ++i) {
            if (usersWithStats[i].userId === id) {
                user = usersWithStats[i];
            }
        }

        if (typeof user === 'undefined') {
            user = {
                userId: id,
                numberOfTimesWon: 0,
                numberOfTimesLost: 0,
                numberOfTickets: 0,
                numberOfTimesParticipated: 0
            };
            usersWithStats.push(user);
        }

        return user;
    }

    return statisticsCommonModule;
})();
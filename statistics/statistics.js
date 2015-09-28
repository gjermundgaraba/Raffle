(function () {
    if (Meteor.isClient) {

        Template.statistics.rendered = function () {
            var ctx = $("#myChart").get(0).getContext("2d");

            var users = this.data.users;
            var raffles = this.data.raffles;

            var usersWithStats = [];
            populateUsersWithStats();
            usersWithStats.sort(function (a, b) {
                return b.numberOfTimesWon - a.numberOfTimesWon;
            });

            var labels= [];
            var winsData = [];
            var participatedData = [];
            for (var i = 0; i < usersWithStats.length; ++i) {
                var user = findUser(usersWithStats[i].userId);
                labels.push(user.name);
                winsData.push(usersWithStats[i].numberOfTimesWon);
                participatedData.push(usersWithStats[i].numberOfTimesParticipated);
            }

            var data = {
                labels: labels,
                datasets: [
                    {
                        label: "Wins",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: winsData
                    },
                    {
                        label: "Participated",
                        fillColor: "rgba(220,220,220,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: participatedData
                    }
                ]
            };

            new Chart(ctx).Bar(data, {
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
            });

            function populateUsersWithStats() {
                for (var i = 0; i < raffles.length; ++i) {
                    var currentRaffle = raffles[i];

                    for (var j = 0; j < currentRaffle.winners.length; ++j) {
                        var winner = findUserWithStats(currentRaffle.winners[j].userId);

                        winner.numberOfTimesParticipated += 1;
                        winner.numberOfTimesWon += 1;
                        winner.numberOfTickets += currentRaffle.winners[j].tickets;
                    }

                    for (var k = 0; k < currentRaffle.losers.length; ++k) {
                        var loser = findUserWithStats(currentRaffle.losers[k].userId);

                        loser.numberOfTimesParticipated += 1;
                        loser.numberOfTimesLost += 1;
                        loser.numberOfTickets += currentRaffle.losers[k].tickets;
                    }

                    for (var l = 0; l < currentRaffle.participants.length; ++l) {
                        var participant = findUserWithStats(currentRaffle.participants[l].userId);

                        participant.numberOfTimesParticipated += 1;
                        participant.numberOfTickets += currentRaffle.participants[l].tickets;
                    }
                }
            }

            function findUserWithStats(id) {
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

            function findUser(id) {
                for (var i = 0; i < users.length; ++i) {
                    if (users[i]._id === id) {
                        return users[i];
                    }
                }
            }
        };
    }

})();
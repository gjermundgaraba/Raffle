
(function () {
    if (Meteor.isClient) {

        Template.actualValueBarChart.rendered = function () {
            var ctx = $("#actualValueBarChartCanvas").get(0).getContext("2d");

            var valuePerTicketSettings = Settings.findOne({
                settingsName: 'valuePerTicket'
            });
            var valuePerTicket = valuePerTicketSettings.value;

            var usersWithStats = STATISTICS_COMMON.generateUsersStatistics(this.data.raffles);
            usersWithStats.sort(function (a, b) {
                return (((b.numberOfTickets*valuePerTicket)/b.numberOfTimesWon) - ((a.numberOfTickets*valuePerTicket)/a.numberOfTimesWon));
            });

            var labels= [];
            var actualValueData = [];
            for (var i = 0; i < usersWithStats.length; ++i) {
                var user = STATISTICS_COMMON.findUserInUserStats(usersWithStats[i].userId, this.data.users);

                if (usersWithStats[i].numberOfTimesWon !== 0) {
                    labels.push(user.name);
                    var actualValue = (usersWithStats[i].numberOfTickets*valuePerTicket) / usersWithStats[i].numberOfTimesWon;
                    console.log(actualValue);
                    actualValueData.push(actualValue);
                }
            }

            var data = {
                labels: labels,
                datasets: [
                    {
                        label: "Win-Participated Ratio",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: actualValueData
                    }
                ]
            };

            new Chart(ctx).Bar(data, {
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
            });
        };
    }

})();
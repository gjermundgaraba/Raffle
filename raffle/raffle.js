if (Meteor.isClient) {

    Template.raffle.helpers({
        'anyWinners': function () {
            return this.winners.length;
        },
        'isDone': function () {
            return this.done;
        },
        'isMaster': function() {
            return Session.get('RaffleMaster');
        }
    });

    Template.raffle.events({
        'click .mdl-button--big-ass-button': function() {
            var pool = [];

            for (var i = 0; i < this.participants.length; ++i) {
                var participant = this.participants[i];

                for (var j = 0; j < participant.tickets; ++j) {
                    pool.push(participant.name);
                }
            }

            var winningNumber = getRandomInt(0, pool.length);
            alert(pool[winningNumber]);
        },
        'click #deleteParticipant': function () {
            var parentData = Template.parentData();


            var participantsCopy = parentData.participants.slice();
            for (var i = 0; i < participantsCopy.length; ++i) {
                var currentParticipant = participantsCopy[i];

                if (currentParticipant.name === this.name) {
                    participantsCopy.splice(i, 1);
                    break; // Should only ever be one with that name, lets continue
                }
            }

            Raffles.update({_id: parentData._id}, {
                $set: {
                    participants: participantsCopy
                }
            });
        },
        'submit .new-raffle-participant': function (event) {
            event.preventDefault();

            var participant = {
                name: event.target.name.value,
                tickets: event.target.numberOfTickets.value
            };

            var alreadyEntered = (this.participants.filter(function (element) {
                return element.name === participant.name;
            }).length > 0);

            if (alreadyEntered) {
                // TODO: SHOW SOME SORT OF ERROR
                alert('YOU HAVE ALREADY ENTERED THIS RAFFLE!')
            } else {
                Raffles.update({ _id: this._id }, {
                    $push: {
                        participants: participant
                    }
                });
            }

            event.target.reset();
        }
    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
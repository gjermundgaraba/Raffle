if (Meteor.isClient) {
    Template.raffleCard.helpers({
        'raffleDateFormatted': RAFFLE_COMMON.raffleDateFormatted,
        'getTotalNumberOfParticipants': RAFFLE_COMMON.getTotalNumberOfParticipants,
        'anyWinners': RAFFLE_COMMON.anyWinners,
        'severalWinners': RAFFLE_COMMON.severalWinners,
        'isDone': RAFFLE_COMMON.isDone
    });
}

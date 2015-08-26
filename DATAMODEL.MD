# Data Model

Just a simple example of how the data model look. It is currently very simple, to make things move a bit quick.

Very important that participants only have unique names. Client needs to make sure of this for now.

## Meteor.Collection('raffles');
```json
[
    {
        "done" : true/false
        "raffleDate": dateOfTheRaffle,
         winners: [
             {
                 userId: somePersonsId,
                 tickets: 1
             },
             {
                 ...
             }
         ],
         participants: [
             {
                 userId: somePersonsId,
                 tickets: 2
             },
             {
                 ...
             }
         ],
         losers: [
            {
                userId: somePersonsId,
                tickets: 2
            },
            {
                ...
            }
         ]
    },
    {
        ...
    }
]
```
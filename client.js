// Initialize the Power-Up with the required capabilities
TrelloPowerUp.initialize({
  // List actions (for Lock/Unlock List functionality)
  'list-actions': (t) => {
    return t.list('id', 'name').then((list) => {
      const listId = list.id;

      return [
        {
          text: 'Lock List',
          callback: () => {
            return t.set('board', 'shared', `lock_${listId}`, true)
              .then(() => t.alert({ message: `List "${list.name}" is now locked.` }));
          },
        },
        {
          text: 'Unlock List',
          callback: () => {
            return t.set('board', 'shared', `lock_${listId}`, false)
              .then(() => t.alert({ message: `List "${list.name}" is now unlocked.` }));
          },
        },
      ];
    });
  },

  // Card actions (to restrict adding, moving, or archiving cards in locked lists)
  'card-buttons': (t) => {
    return t.card('id', 'idList').then((card) => {
      return t.get('board', 'shared').then((data) => {
        const lockKey = `lock_${card.idList}`;
        if (data[lockKey]) {
          return [
            {
              text: 'Locked',
              callback: () => t.alert({ message: `This list is locked. You cannot perform this action.` }),
            },
          ];
        }
        return []; // Allow normal actions if the list is not locked
      });
    });
  },

  // Board buttons (optional, for debugging locked lists)
  'board-buttons': (t) => [
    {
      text: 'Show Locked Lists',
      callback: (t) => {
        return t.get('board', 'shared').then((data) => {
          const lockedLists = Object.keys(data)
            .filter((key) => key.startsWith('lock_') && data[key])
            .map((key) => key.replace('lock_', ''));

          if (lockedLists.length > 0) {
            t.alert({ message: `Locked Lists: ${lockedLists.join(', ')}` });
          } else {
            t.alert({ message: 'No locked lists found.' });
          }
        });
      },
    },
  ],
});

// Monitor changes to cards and revert actions if necessary
TrelloPowerUp.initialize({
  'on-enable': (t) => {
    return t.get('board', 'shared').then((data) => {
      const lockedLists = Object.keys(data).filter((key) => key.startsWith('lock_') && data[key]);

      // Add logic to revert changes made to locked lists
      lockedLists.forEach((listId) => {
        // Prevent adding new cards
        t.get('card').then((card) => {
          if (card.idList === listId) {
            t.alert({ message: `You cannot add cards to a locked list.` });
            return t.deleteCard(card.id);
          }
        });

        // Prevent moving cards out of the list
        t.get('card').then((card) => {
          if (card.idList !== listId && data[`lock_${card.idList}`]) {
            t.alert({ message: `You cannot move cards out of a locked list.` });
            t.updateCard({ id: card.id, idList: listId });
          }
        });
      });
    });
  },
});

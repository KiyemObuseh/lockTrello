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

const t = TrelloPowerUp.iframe();

// Initialize the Power-Up with the required capabilities
TrelloPowerUp.initialize({
  'list-actions': (t) => {
    return t.list('id', 'name').then((list) => {
      const listId = list.id;

      // Return custom actions for the list menu
      return [
        {
          text: 'Lock List',
          callback: (t) => {
            // Save the lock state to Trello's shared storage
            return t.set('board', 'shared', `lock_${listId}`, true)
              .then(() => {
                t.alert({ message: `List "${list.name}" has been locked.` });
              });
          },
        },
        {
          text: 'Unlock List',
          callback: (t) => {
            // Remove the lock state from Trello's shared storage
            return t.set('board', 'shared', `lock_${listId}`, false)
              .then(() => {
                t.alert({ message: `List "${list.name}" has been unlocked.` });
              });
          },
        },
      ];
    });
  },

  // Optional: Add a board button for debugging or viewing locked lists
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

// Listen for the Power-Up render event to confirm initialization
t.render(() => {
  console.log('Power-Up has rendered.');
});

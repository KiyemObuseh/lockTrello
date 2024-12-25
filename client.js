// Initialize the Power-Up with the required capabilities
TrelloPowerUp.initialize({
  // Add actions for list menu
  'list-actions': (t) => {
    return t.list('id', 'name').then((list) => {
      const listId = list.id;

      return [
        {
          text: 'Lock List',
          callback: () => {
            return t.set('board', 'shared', `lock_${listId}`, true)
              .then(() => t.alert({ message: `List "${list.name}" has been locked.` }));
          },
        },
        {
          text: 'Unlock List',
          callback: () => {
            return t.set('board', 'shared', `lock_${listId}`, false)
              .then(() => t.alert({ message: `List "${list.name}" has been unlocked.` }));
          },
        },
      ];
    });
  },
});

TrelloPowerUp.initialize({
  'list-actions': (t) => {
    return t.list('id', 'name').then((list) => {
      return [
        {
          text: 'Lock List',
          callback: () => {
            return t.set('board', 'shared', `lock_${list.id}`, true)
              .then(() => t.alert({ message: `List "${list.name}" locked.` }));
          },
        },
        {
          text: 'Unlock List',
          callback: () => {
            return t.set('board', 'shared', `lock_${list.id}`, false)
              .then(() => t.alert({ message: `List "${list.name}" unlocked.` }));
          },
        },
      ];
    });
  },
});

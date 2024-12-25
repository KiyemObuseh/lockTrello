const t = TrelloPowerUp.iframe();

// Simulated locked lists (use an API or database for persistent storage)
let lockedLists = [];

t.render(() => {
  console.log("Power-Up loaded!");
});

// Add list action for locking/unlocking lists
t.set('board-buttons', [
  {
    icon: 'https://example.com/lock-icon.png', // Replace with your icon URL
    text: 'Lock/Unlock List',
    callback: (t) => {
      return t.list('id', 'name').then((list) => {
        const listId = list.id;

        if (lockedLists.includes(listId)) {
          // Unlock the list
          lockedLists = lockedLists.filter((id) => id !== listId);
          t.alert({ message: `List "${list.name}" unlocked.` });
        } else {
          // Lock the list
          lockedLists.push(listId);
          t.alert({ message: `List "${list.name}" locked.` });
        }

        return t.closePopup();
      });
    },
  },
]);

// Prevent card movement into or out of locked lists
t.set('card-buttons', [
  {
    text: 'Move to Another List',
    condition: 'edit',
    callback: (t) => {
      return t.card('idList').then((card) => {
        if (lockedLists.includes(card.idList)) {
          t.alert({ message: "This list is locked. You can't move cards out of it!" });
          return t.closePopup();
        }
        // Proceed with moving the card
      });
    },
  },
]);

// Add additional logic for card editing (if needed)

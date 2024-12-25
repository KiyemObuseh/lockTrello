Lock Trello
A custom Trello Power-Up that allows users to lock specific lists while still enabling edits to the cards inside them.

Features
Lock Lists: Prevent users from moving, renaming, or adding/removing cards directly to/from a locked list.
Card Editing: Users can still edit the content of cards within locked lists.
User-Friendly Interface: Simple controls for locking and unlocking lists.
Installation
Add the Power-Up to Trello
Go to the Trello Power-Up Admin.
Click Create a new Power-Up.
Enter the following information:
Name: Lock Trello
Manifest URL: [Add the GitHub Pages URL to your manifest.json file]
Save and enable the Power-Up on your Trello board.
Usage
Open a Trello board where the Power-Up is enabled.
To lock or unlock a list:
Click the "..." menu at the top of the list.
Select the Lock/Unlock List option.
Locked lists will restrict the following:
Moving the list to another position.
Adding or removing cards directly in the list.
Editing cards inside locked lists remains fully functional.
Development
This Power-Up is built using:

HTML: For the main interface.
JavaScript: For functionality and Trello API interactions.
Trello Power-Up Client Library: To communicate with Trello.
File Structure
manifest.json: Defines the Power-Up’s capabilities and metadata.
index.html: Entry point for the Power-Up interface.
client.js: Contains the core JavaScript logic for locking lists.
Hosting
This Power-Up is hosted via GitHub Pages. The hosted files can be accessed through the following URL:
[Add your GitHub Pages URL here]

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit your changes (git commit -m "Add feature-name").
Push the branch (git push origin feature-name).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Support
If you encounter any issues or have suggestions, feel free to open an issue in the GitHub repository.


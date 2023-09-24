# BYU-CS-260
## Notes for Class

[notes for this class](/notes.md)
## Description Deliverable
### Elevator Pitch
This application is mostly a joke on how social media websites currently all need some kind of gimmick to make them stand out. This application would take it to the next level of stupidness. The idea here is to have the same form of being able to have posts that users can create that would be tied to their profiles, but now every single post must have a YouTube view attached to it. It does not matter if it is a post, comment, or DM, they all need to have a YouTube video attached to it. The client will be more akin to how twitter acts and feels in terms of posts, and will also have a side tab for sending DMs directly to users. If someone forgets to send a YouTube link with their post, a random link from a list of curated videos will be chosen, and this user will then have some kind of badge next to their name for the next day. Overall, this isn't meant to replace anything, it's just meant to be silly and help me practice with the ideas that we will learn in this class.
### Design
![name of image](/Images/a.png)
### Key Features
 - Secure login over over HTTPS
 - Able to post to the world
 - Embeds YouTube videos
 - Allow for comments on "threads"
 - click on user icon to either DM them
 - separate panel for DMs
 - DMs will have a notification dot to show new messages in DMs
 - Posts will be shown by newest first
### Stretch Goals
 - Site will be adaptive to screen size
 - 2FA
 - Multiple Site themes to choose from
 - other things that I think of will go here
### Technologies
- **HTML** - Correct HTML structure for 2 pages, one being a login page and the other being the posts and DMs page. This might be more pages later
- **CSS** - Adaptive screen sizes, though mostly focused on desktop 1920x1080 for simplicity, and if I have time, other screen sizes. Make it look nice and pretty and mostly useable
- **JavaScript** - Does Login, Post creation, Comment creation, anything DM related, interaction with user icons, other things that I might have missed. This would also handle backend endpoint calls.
- **Service** - backend service with endpoints for:
-- Login
-- grabbing posts
-- posting posts
-- DM messages
-- posting comments
-- other endpoints I might have forgotten
- **DB** - Point to keep all user information, will probably be mongodb
- **Login** - Register and login users. Credentials securely stored in database. Can't post unless authenticated.
- **WebSocket** - As each user post or comment, their contributions are broadcast to all other users.
- **React** - Application ported to use the React web framework.

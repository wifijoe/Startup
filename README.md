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
## HTML deliverable
For this deliverable, I took the simon HTML code and reformated it to work for what I needed it to do. This is the basic structure of my website, and will probably see a lot of updates as I learn to better understand how it all should work.
- **HTML** Pages - 3 HTML pages that represent logging in, the homepage where statuses will be, and DMs where users can interact with one another more directly.
- **Links** - The login page will take the user to the home page once they "log in." Once there, there are links to go to the DMs or log out. On the DMs page, they can either go home or log out.
- **Text** - The text here is simple for now. It is usernames and user comments around the videos, along with the website name on each page, and the github at the bottom of the page.
- **Images** - There are User profile pictures, currently represented by a little mySpace picture
- **Login** - The login page has an input box for a username and a button to log in with. This will eventually have a password button also when that becomes relevant.
- **Database** - The user statuses on the homepage and the DMs all would need to be stored in a database, along with the profile pictures.
- **WebSocket** - Technically the YouTube videos are realtime content, more more seriously, the feed would be updating every 5ish minutes (subject to change) to keep the user up to date, and the DMs would be updating whenever either user pushed a new message to it. These are all realtime and would update as needed. So would profile pictures.
- **3rd Party Service Calls** - This has the gimmick of YouTube videos everywhere. These are 3rd party service calls.
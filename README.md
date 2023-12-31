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
## CSS Deliverable
For this deliverable, I took my basic understanding of CSS and created a basic webpage with it. Chances are, with the JavaScript deliverable, this will be swapping over to bootstrap to make my life easier and this more actually reactive.
- **Header, Footer, and Main Content Body** - All are included and all are there, and they all react to the resizing of Windows, though not exactly how I would want it going forward. This will be changed in the next version.
- **Navigation elements** - Added a password on the landing page, it doesn't actually do anything, and then the button has black text. The Logout hyperlink on the home page now stays white no matter what. The DM page is gone, now being combined with the Home page to make it look closer to the original image.
- **Response to Window Resizing** - It resizes to work with many different window types! There is also scrolling for each side of the home page, or scrolling overall if the screen is not wide enough.
- **Application elements** - They all try to use the available space found on both phones and comptuers to the best of its ability. The blank space will be moved to the edges with the next update, and then moved again at a later point as I try to get it closer and closer to the image above.
- **Application text content** - Same font everywhere!
- **Application images** - If thumbnails count as an Image, they're here! also user profile pictures are here and have remained untouched. 
## JavaScript Deliverable
for this deliverable, I used Javascript to allow the website to do things when pressing different buttons and links
- **Login** - When the Login button is pressed, it stores the username of the person (can be blank right now) and then brings them to the other page, the home page. (will have more than two pages later, proof of concept right now)
- **database** - The username is being stored locally, everything else is destroyed upon reloading due to currently not seralizing inputs. The representation of what it would be like if posts were stored is there, as the user is able to fill out a comment and paste in a youtube link to "post" a status.
- **WebSocket** - The setInterval function is being used to periodically add videos to the feed. This will be replaced with a WebSocket message between all clients later.
- **application logic** - not a lot here yet as this will come with the new DMs page, but the user can post and play videos on the website. Soon to come will be DMs with their own pages, but I ran out of time to impliment that past a very primitive version.
- **Other** - This is still very much a proof of concept and will be updated to be both a lot smoother and a lot cleaner with the coming updates to the code. That is just not happening tonight, as I've been fighting with bootstrap for 6 hours now and I need a break.
## Service deliverable
for this deliverable, I got the API calls all set up, and some limited storage for posts in RAM.
- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
- **3rd party calls** - calls are made to Quotes API to generate users and comments under a predefined youtube video as a proof of concept.
- **Backend service endpoints** - endpoints for posts that the user create for both posts and also DMs.
- **Frontend service endpoints** - using fetch, the page creates and then updates with user information whenever it is refreshed.
## DB Deliverable
for this deliverable, I got the website connected to and using mongoDB.
- **MongoDB Atlas database created** - done!
- **Endpoints for data** - the endpoints now point towards and use MongoDB
- **Stores data in MongoDB** - done!
## Login Deliverable
for this deliverable, I got the login and user creation screens to work.
- **User registration** - Creates a new account in the database.
- **existing user** - allows existing users to log in with their credentials to see all of the posts on the server. DMs do not function properly right now.
- **Use MongoDB to store credentials** - done!
- **Restricts functionality** - You cannot see the Home page if you are not logged in. If you log out and navigate back to the Home page, the site will kick you back to the login screen.
## Websocket derliverable
for this deliverable, I found a way to use websockets to have the posts update whenever another user posts.
- **Backend listens for WebSocket connection** - done!
- **Frontend makes WebSocket connection** - done!
- **Data sent over WebSocket connection** - done!
- **WebSocket data displayed** - Posts update as people post them from different browsers.

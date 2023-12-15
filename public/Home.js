const videoIDs = [
    "https://www.youtube-nocookie.com/embed/2DGqVbTHX-k",
    "https://www.youtube-nocookie.com/embed/5AU2EudKYI4",
    "https://www.youtube-nocookie.com/embed/1Jwo5qc78QU"
];

let socket;

const MessagePostEvent = 'messagePostEvent';

function generateRandomMessage(type) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
	    const placeToAdd = document.getElementById(`${type}`);
        tempHTML = generateHTML(videoIDs[Math.floor(Math.random() * 3)], data.content, data.author);
	    placeToAdd.innerHTML += tempHTML;
  });
}

function generateHTML(link, comment, username="other user's username") {
	return HTMl = `
    <div class="video_post">
        <div class="user_info">
            <span class="user_image">
            <img src="https://myspace.com/common/images/user.png" width="30"/>
            </span>
            <span class="other_user">${username}</span>
        </div>
        <div class="container">
            <iframe
                src="${link}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
                web-share"
                allowfullscreen
                class="video">
            </iframe>
        </div>
        <span class="comment_from_user">${comment}</span>
    </div>`;
}

async function generatePost() {
	event.preventDefault();
	const comment = document.querySelector("#home_status").value;
	let link = document.querySelector("#home_link").value;
	if (comment != "" || link != "") {
		link = link.replace("youtu.be", "www.youtube-nocookie.com/embed");
		link = link.replace(/\?si=.*/g, "");

		tempHTML = generateHTML(link, comment, localStorage.getItem("username"));
		const placeToAdd = document.getElementById("video_post");
		placeToAdd.innerHTML += tempHTML;
        const information = {links: link, comments: comment, username: localStorage.getItem("username")}

        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(information),
            });

            const posts = await response.json();
            localStorage.setItem('posts', JSON.stringify(posts));
            console.log("got to broadcast")
            broadcastEvent(MessagePostEvent, localStorage.getItem("username"))
	    } catch (e) {
            //there was an error, print to console that something happened
            console.log(e.message);
        }

    }
}

async function generateDM() {
	event.preventDefault();
	const comment = document.querySelector("#dm_status").value;
	let link = document.querySelector("#dm_link").value;
	if (comment != "" || link != "") {
		link = link.replace("youtu.be", "www.youtube-nocookie.com/embed");
		link = link.replace(/\?si=.*/g, "");

		tempHTML = generateHTML(link, comment, localStorage.getItem("username"));
		const placeToAdd = document.getElementById("DM_message");
		placeToAdd.innerHTML += tempHTML;

        const information = {links: link, comments: comment, username: localStorage.getItem("username")}

        try {
            const response = await fetch('/api/dmMessage', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(information),
            });

            const dmPosts = await response.json();
            localStorage.setItem('dmPosts', JSON.stringify(dmPosts));
	    } catch (e) {
            //there was an error, print to console that something happened
            console.log(e.message);
        }
	}
}

async function runTime() {
    pushUpdate();
    configureWebSocket();
	const nameToChange = document.getElementById("user-name");
	nameToChange.innerHTML = localStorage.getItem("username");
	setInterval(function() {generateRandomMessage("video_post");}, 50000);
	setInterval(function() {generateRandomMessage("DM_message");}, 55489);
}

async function pushUpdate() {
    await refreshPosts();
    update('posts', "video_post");
    update('dmPosts', "DM_message");
}

function update(type, insert_name) {
    const postsText = localStorage.getItem(type);
    let posts = null
    if (postsText) {
        posts = JSON.parse(postsText);
        if (posts.length) {
            for (const post of posts){
                const placeToAdd = document.getElementById(insert_name);
                tempHTML = generateHTML(post.links, post.comments, post.username);
	            placeToAdd.innerHTML += tempHTML;
            }
        }
    }
}

async function refreshPosts() {
    try {
        const response = await fetch('/api/dmMessages');

        if (response.status === 401) {
            window.location.href = 'index.html'
            return
        }

        const dmposts = await response.json();

        const response2 = await fetch('/api/posts');
        const posts = await response2.json();

        localStorage.setItem('dmPosts', JSON.stringify(dmposts));
        localStorage.setItem('posts', JSON.stringify(posts));
    } catch (e) {
        //there was an error, print to console that something happened
        console.log(e.message);
    }
}

function logout() {
    localStorage.removeItem('username');
    fetch(`/api/auth/logout`, {
        method: 'delete',
    }).then(() => (window.location.href = 'index.html'));
}

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        displayMsg('client', 'connected');
    };
    socket.onclose = (event) => {
        displayMsg('client', 'disconnected');
    };
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === MessagePostEvent) {
          displayMsg(msg.from, `posted`);
          pushUpdate();
        }
      };
}

function displayMsg(from, msg) {
    const errorMessage = document.querySelector("#webSocket");
    errorMessage.textContent = `${from} ${msg}`;
}
function broadcastEvent(type, value) {
    console.log("in broadcast")
    const event = {
      type: type,
      from: value,
    };
    socket.send(JSON.stringify(event));
  }
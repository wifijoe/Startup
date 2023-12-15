const videoIDs = [
    "https://www.youtube-nocookie.com/embed/2DGqVbTHX-k",
    "https://www.youtube-nocookie.com/embed/5AU2EudKYI4",
    "https://www.youtube-nocookie.com/embed/1Jwo5qc78QU"
];

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
        const information = [link, comment, localStorage.getItem("username")]

        try {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(information),
            });

            const posts = await response.json();
            localStorage.setItem('posts', JSON.stringify(posts));
	    } catch {
            //there was an error, print to console that something happened
            console.log("some error happened with sending data...");
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

        const information = [link, comment, localStorage.getItem("username")]

        try {
            const response = await fetch('/api/dmMessage', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(information),
            });

            const dmPosts = await response.json();
            localStorage.setItem('dmPosts', JSON.stringify(dmPosts));
	    } catch {
            //there was an error, print to console that something happened
            console.log("some error happened with sending data...");
        }
	}
}

function runTime() {
    refreshPosts();
    update('posts', "video_post");
    update('dmPosts', "DM_message");
	const nameToChange = document.getElementById("user-name");
	nameToChange.innerHTML = localStorage.getItem("username");
	setInterval(function() {generateRandomMessage("video_post");}, 30000);
	setInterval(function() {generateRandomMessage("DM_message");}, 35489);
}

function update(type, insert_name) {
    const postsText = localStorage.getItem(type);
    let posts = null
    if (postsText) {
        posts = JSON.parse(postsText);
        if (posts.length) {
            for (const post of posts){
                const placeToAdd = document.getElementById(insert_name);
                tempHTML = generateHTML(post[0], post[1], post[2]);
	            placeToAdd.innerHTML += tempHTML;
            }
        }
    }
}

async function refreshPosts() {
    try {
        const response = await fetch('/api/dmMessages');
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


const videoIDs = [
    "https://www.youtube-nocookie.com/embed/2DGqVbTHX-k",
    "https://www.youtube-nocookie.com/embed/5AU2EudKYI4",
    "https://www.youtube-nocookie.com/embed/1Jwo5qc78QU"
];

const comments = [
    "I am a comment",
    "the 2",
    "I ran out of things to type"
];

function generateRandomMessage(type) {
	const placeToAdd = document.getElementById(`${type}`);
    tempHTML = generateHTML(videoIDs[Math.floor(Math.random() * 3)], comments[Math.floor(Math.random() * 3)])
	placeToAdd.innerHTML += tempHTML;
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

function generatePost() {
	event.preventDefault()
	const comment = document.querySelector("#home_status").value;
	let link = document.querySelector("#home_link").value;
	link = link.replace("youtu.be", "www.youtube-nocookie.com/embed")
	link = link.replace(/\?si=.*/g, "")

	tempHTML = generateHTML(link, comment, localStorage.getItem("username"))
	const placeToAdd = document.getElementById("video_post");
	placeToAdd.innerHTML += tempHTML;
}

function generateDM() {
	event.preventDefault()
	const comment = document.querySelector("#dm_status").value;
	let link = document.querySelector("#dm_link").value;
	link = link.replace("youtu.be", "www.youtube-nocookie.com/embed")
	link = link.replace(/\?si=.*/g, "")

	tempHTML = generateHTML(link, comment, localStorage.getItem("username"))
	const placeToAdd = document.getElementById("DM_message");
	placeToAdd.innerHTML += tempHTML;
}

function runTime() {
	const nameToChange = document.getElementById("user-name")
	nameToChange.innerHTML = localStorage.getItem("username")
	setInterval(function() {generateRandomMessage("video_post");}, 10000)
	setInterval(function() {generateRandomMessage("DM_message");}, 15489)
}

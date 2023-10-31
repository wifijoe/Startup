const videoIDs = [
    "https://www.youtube-nocookie.com/embed/2DGqVbTHX-k?si=w8ui0gi-cW_PK0kq",
    "https://www.youtube-nocookie.com/embed/5AU2EudKYI4?si=PkkhNzRoZ-CAVB6W",
    "https://www.youtube-nocookie.com/embed/1Jwo5qc78QU?si=mUJhZFrFnbgTyecw"
];

const comments = [
    "I am a comment",
    "the 2",
    "I ran out of things to type"
];

function generateRandomMessage(type) {
	const placeToAdd = document.getElementById(`${type}`);
    tempHTML = `
    <div class="video_post">
        <div class="user_info">
            <span class="user_image">
            <img src="https://myspace.com/common/images/user.png" width="30"/>
            </span>
            <span class="other_user">other user's username</span>
        </div>
        <div class="container">
            <iframe
                src="${videoIDs[Math.floor(Math.random() * 3)]}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; 
                web-share"
                allowfullscreen
                class="video">
            </iframe>
        </div>
        <span class="comment_from_user">${comments[Math.floor(Math.random() * 3)]}</span>
    </div>`;
	placeToAdd.innerHTML += tempHTML;
}

function runTime() {
	const nameToChange = document.getElementById("user-name")
	nameToChange.innerHTML = localStorage.getItem("username")
	setInterval(function() {generateRandomMessage("video_post");}, 10000)
	setInterval(function() {generateRandomMessage("DM_message");}, 15489)
}
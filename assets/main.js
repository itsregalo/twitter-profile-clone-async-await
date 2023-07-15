let userProfile = document.getElementById('userProfile');
let profileName = document.getElementById('profileName');
let username = document.getElementById('username');
let userWeb = document.getElementById('userWeb');
let userBio = document.getElementById('bio');
let userLocation = document.getElementById('exactLocation');

let userImage = document.getElementById('userImage');
let userPosts = document.getElementById('userPosts');
let singlePost = document.getElementById('singlePost');

class UserProfile {
    static async getProfile() {
        const response = await fetch('http://localhost:3000/users/5');
        const profile = await response.json();

        userImage.src = profile.dp;
        profileName.innerHTML = profile.name;
        username.innerHTML = profile.username;
        userWeb.innerHTML = profile.website;
        userBio.innerHTML = profile.bio;
        userLocation.innerHTML = profile.address.city;

        this.getPosts(profile.id);

        return profile;
    }

    static async updateProfile(data) {
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const profile = await response.json();
        return profile;
    }

    static async deleteProfile() {
        const response = await fetch('/api/profile', {
            method: 'DELETE',
        });
        const profile = await response.json();
        return profile;
    }

    static async getPosts(userId) {
        const response = await fetch(`http://localhost:3000/posts?userId=${userId}`);
        const posts = await response.json();

        posts.forEach((item,index)=>{
            userPosts.innerHTML += `
                <div class="singlePost" onclick="UserProfile.getPostComments(${item.id})">
                    <div class="title">
                        <h3>${item.title}</h3>
                    </div>
                    <div class="body">
                        <p>${item.body}</p>
                    </div>
                </div>
                `
        })
        return posts;
    }

    static async createPost(data) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const post = await response.json();
        return post;
    }

    static async getPostComments(post_id){
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post_id}`);
        const comments = await response.json();
        const commentList = document.getElementById('comments');
        commentList.innerHTML = '';
        comments.forEach((item,index)=>{
            commentList.innerHTML += `
                <div class="singleComment">
                    <div class="commentName" id="commentName">
                        <p><b>${item.name}</b></p>
                    </div>
                    <div class="commentBody" id="commentBody">
                        <p>${item.body}</p>
                    </div>
                    </div>
                </div>
                `
        })

        return comments;
    }
    


}

UserProfile.getProfile();


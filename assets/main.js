let userProfile = document.getElementById('userProfile');
let profileName = document.getElementById('profileName');
let username = document.getElementById('username');
let userWeb = document.getElementById('userWeb');
let userBio = document.getElementById('bio');
let userLocation = document.getElementById('exactLocation');

let userImage = document.getElementById('userImage');
let userPosts = document.getElementById('userPosts');
let singlePost = document.getElementById('singlePost');
let selectUser = document.getElementById('selectuser');

class UserProfile {
    static async getUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        users.forEach((user,index)=>{
            let option = document.createElement('option');
            option.value = user.id;
            option.innerHTML = user.name;
            selectUser.appendChild(option);
        })
        return users;
    }

    static async getProfile(userId) {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/'+userId);
        const profile = await response.json();

        userImage.src = 'https://pbs.twimg.com/profile_images/1393545124240625665/qM05LJ9h_400x400.jpg'
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
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();
        const comments = document.getElementById('comments');
        console.log(comments.length);

        if (comments.length == undefined) {
            this.getPostComments(posts[0].id);
        }


        posts.forEach((item,index)=>{
            userPosts.innerHTML += `
                <div class="singlePost" onclick="UserProfile.getPostComments(${item.id})">
                  
                    <div class="post-image">
                        <img src="https://pbs.twimg.com/profile_images/1393545124240625665/qM05LJ9h_400x400.jpg" alt="" width="100px" >
                    </div>
                    
                  
                    <div class="postBody">
                        <div class="title">
                            <h3>${item.title}
                            <span>
                                <img src="/assets/images/icons/003-verified.png"/>
                                <img src="/assets/images/icons/twitter.png"/>
                            </span>
                            </h3>
                        </div>
                        <div class="post-body">
                            <p>${item.body}</p>
                        </div>
                        <hr>
                        <div class="post-stats">
                            <div class="post-comments">
                                <img src="/assets/images/icons/001-comment.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                            <div class="post-retweets">
                                <img src="/assets/images/icons/004-repost.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                            <div class="post-likes">
                                <img src="/assets/images/icons/006-heart-1.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                        </div>
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
        const postNumber = document.getElementById('postNumber');
        postNumber.innerHTML = `Post ${post_id}`;
        commentList.innerHTML = '';
        comments.forEach((item,index)=>{
            commentList.innerHTML += `
                <div class="singleComment">
                    <div class="comment-image">
                        <img src="https://pbs.twimg.com/profile_images/1393545124240625665/qM05LJ9h_400x400.jpg" alt="" width="100px" >
                    </div>

                    <div class="comment-body">
                        <div class="commentName" id="commentName">
                            <p><b>${item.name}</b>
                            <span>
                                <img src="/assets/images/icons/003-verified.png"/>
                                <img src="/assets/images/icons/twitter.png"/>
                            </span>
                            </p>
                        </div>
                        <div class="commentBody" id="commentBody">
                            <p>${item.body}</p>
                        </div>
                        <hr>
                        <div class="post-stats">
                            <div class="post-comments">
                                <img src="/assets/images/icons/001-comment.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                            <div class="post-retweets">
                                <img src="/assets/images/icons/004-repost.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                            <div class="post-likes">
                                <img src="/assets/images/icons/006-heart-1.png" alt="" width="20px">
                                <span>0</span>
                            </div>
                        </div>
                    </div>

                     
                </div>
                `
        })

        return comments;
    }
    


}
UserProfile.getUsers();
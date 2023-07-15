class UserProfile {
    static async getProfile() {
        const response = await fetch('/api/profile');
        const profile = await response.json();
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

    static async getPosts() {
        const response = await fetch('/api/posts');
        const posts = await response.json();
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
    


}
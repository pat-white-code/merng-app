import Post from "../../models/Post.js";

const postsResolvers = {
    Query: {
        posts: async () => {
            try {
                const posts = await Post.find();
                return posts;
        } catch (err) {
                throw new Error(err);
            }
        },
    },
};

export default postsResolvers;

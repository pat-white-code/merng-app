import checkAuth from '../../../util/auth.js'

const getIsLiked = async (parent, _, context) => {
    const { id } = checkAuth(context)
    const foundLike = parent.likes.find(like => like.userId === id)
    return !!foundLike
} 

export default getIsLiked
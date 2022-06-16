import { getDatabase, onValue,off, ref, set, remove} from 'firebase/database'

class CommentRepository {

    constructor(app) {
        this.db = getDatabase();
    }

    saveComment(userId,reviewId, comment){
        set(ref(this.db, `${userId}/reviews/${reviewId}/comment/${comment.id}`), comment);
        console.log(' user 저장성공!')
        set(ref(this.db, `reviews/review/${reviewId}/comment/${comment.id}`), comment);
        console.log(' reviews 저장성공!')
    }

    removeComment(userId, reviewId, comment) {
        remove(ref(this.db, `${userId}/reviews/${reviewId}/comment/${comment.id}`));
        console.log(' user 삭제성공!')
        remove(ref(this.db, `reviews/review/${reviewId}/comment/${comment.id}`));
        console.log(' reviews 삭제성공!')
    }
}

export default CommentRepository;
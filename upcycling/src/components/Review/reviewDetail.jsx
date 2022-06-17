import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CSS/reviewDetail.module.css'


//🍎 reviewPage에서 item의 이미지를 클릭했을 때 이동하는 컴포넌트
//Reivew의 전체적인 내용을 출력

const ReviewDetail = ({deleteReview, reviews, createAndUpdateComment, clickLike, userId, deleteComment}) => {
    const location = useLocation();
    const navigation = useNavigate();
    const [reviewState, setReviewState] = useState(location.state.review)
    const [user] = useState(userId)
    const [text, setText] = useState('')

    //🍎firebase에 저장된 코멘트 받아오기
    let currentComments = Object.hasOwn(reviews[reviewState.id],"comment") ?Object.values(reviews[reviewState.id]["comment"]) : undefined
    const [comments,setComments] = useState([])

    useEffect(()=> {
        if(currentComments !== null) {
            setComments(currentComments)
        }else if (currentComments === undefined) {
            setComments([])
        }
    },[reviews, currentComments])
    

//🍎Reivew수정하기
    const goRevise = (review) =>{
        navigation(`/review/revise/${review.id}`, {state : {review}})
        
    }

    const textareaRef = useRef()

    const onChange = (event) => {
        if(event.currentTarget == null) {
            return;
        }
        event.preventDefault();
        setText(event.target.value)

    }

    const newComment = {
        id : 'C' + Date.now(),
        userName : reviewState.nickname,
        comment : text || '',
        date : Date.now()
    }



    //🍎코멘트 ADD
    //console.log(newComment)
    const onSubmit = (event) => {
        event.preventDefault();

        const review = {...reviewState}
        createAndUpdateComment(newComment,review.id,user)
        textareaRef.current.reset()
    }

    //🍎Comment Delete
    const onDeleteComment = (comment) => {
        deleteComment(comment,reviewState.id, user)
    }
    
    //🍎like 관련 함수
    const onLikes = (event) => {
        event.preventDefault();
        const nickname = reviewState.nickname
        const review = {...reviewState}

        /*
        리뷰의 likes를 돌면서 만약에 review.likes베열인에 닉네임이 같다면
        return만 반환하고

        만약에 닉네임이 다르다면 
        */
        review.likes = [...review.likes,nickname]

        setReviewState(review)
        clickLike(review)
    }

    return (
        <section >
            <div className={styles.header}> 
                <div className={styles.userInfo}>
                    <img src={reviewState.profileIMG} alt="profile" />
                    <h3>{reviewState.nickname}</h3>
                </div>
                <div className={styles.searchInput}>
                    <input type="text" />
                    <button>Search</button>
                </div>
            </div>
            
            <div className={styles.content}>
                <img src={reviewState.reviewIMG} alt="review" />
                <div className={styles.container}>
                    <select name="" id="">
                        <option value="">숨기기</option>
                        <option value="">신고하기</option>
                        <option value="">삭제</option>
                        <option value="">수정</option>
                    </select>
                    <div className={styles.title}>
                        <h3>{reviewState.reviewTitle}</h3>
                        <p>{reviewState.reviewHashtags}</p>
                    </div>
                    <p className={styles.description}>{reviewState.reviewDescription}</p>
                </div>
                
            </div>

            <hr />
            <div className={styles.icon_container}>
                <div className={styles.icon_container_left}>
                    <button 
                    className={styles.heart}
                    onClick={onLikes}
                    >👍</button>
                    <button className={styles.comment}>💌</button>
                </div>
                <div className={styles.icon_container_right}>
                    <button onClick={()=>goRevise(reviewState)}>수정</button>
                    <button onClick={()=>deleteReview(reviewState)}>삭제</button>
                </div>
            </div>
            <div className={styles.comments_container}>
                { comments && (
                        comments.map((item)=> (
                            <div key={item.id} className={styles.comments_item}>
                                    <span className={styles.comments_user}>{item.userName}</span>
                                    <span className={styles.comments_date}>{item.date}</span>
                                    <p className={styles.comments_text}>{item.comment}</p>
                                <button onClick={()=>onDeleteComment(item)}>삭제</button>
                            </div>)
                    ))
                    
                    
                }
            </div>
            <form className={styles.comment_form} ref={textareaRef}>
                <textarea  onChange={onChange} className={styles.comment_write} name="comment" id="" cols="30" rows="10"></textarea>
                <button onClick={onSubmit}>Comment Add</button>
            </form>
        </section>
    );
};

export default ReviewDetail;
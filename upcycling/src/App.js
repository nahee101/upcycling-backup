import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import IntroList from './components/Intro/IntroList';
import Home from './page/HomePage';
import FirstMain from './page/FirstMain/FirstMain';
import EventIntro from './components/Intro/EventIntro';
/*๐ ์ง์ import*/
import ReviewWrite from './components/Review/reviewWrite';
import ReviewPage from './components/Review/reviewPage';
import ReviewDetail from './components/Review/reviewDetail';
import ReviewRevise from './components/Review/reviewRevise';
/* ๐ฅ ๋ฐ์ ์ฃผ import ์์ */
import DealWrite from './components/Deal/DealWrite';
import DealPage from './components/Deal/DealPage';
import DealDetail from './components/Deal/DealDetail';
import DealRevise from './components/Deal/DealRevise';
/* ๐ฅ ๋ฐ์ ์ฃผ import ๋ */
import NotFound from './page/NotFound';
import {useState, useEffect} from 'react';
// ๐ฅ 06-15 ํ์ฌ ๋ก๊ทธ์ธํ ์ฌ์ฉ์ ๊ฐ์ ธ์ค๊ธฐ
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { firestore } from './firebase';
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

function App({reviewRepository, commentRepository, imageUploader}) {
  
  //๐ /home์ผ๋ก๋ถํฐ ๋ฐ์์จ user์ uid๊ฐ
  const [userId, setUserId] = useState(null)
  const [reviews, setReviews] = useState([])
  const navigator = useNavigate();

//๐firebase์ ์ ์ฅ๋ review๋ฐ์์ค๊ธฐ
useEffect(()=> {
  const stopSync =  reviewRepository.syncReviews(reviews => {
    setReviews(reviews);
  })
  return () => stopSync();
},[userId, reviewRepository])



//๐์ง์ : create & update review 
const createAndUpdateReview = (review,userId) => {
  // setReviews([...reviews, review]);
  reviewRepository.saveReview(userId, review);
}

//๐์ง์ : delete review 
const deleteReview = (deletedItem) => {

  if(window.confirm("๊ฒ์๊ธ์ ์ ๋ง ์ญ์  ํ์๊ฒ ์ต๋๊น?")){
    reviewRepository.removeReview(userId,deletedItem)
    imageUploader.delete(deletedItem.reviewIMG)
    alert('๊ฒ์๊ธ์ ์ญ์ ํ์ต๋๋ค.');
    navigator('/reviews')
  }
  console.log(deletedItem.reviewIMG)
}



//๐์ง์ : delete Comment 
const deleteComment = (comment,reviewId,userId) => {

  if(window.confirm("ํ์ธ์ ๋๋ฅด์๋ฉด ๋๊ธ์ด ์ญ์ ๋ฉ๋๋ค. ")){
    commentRepository.removeComment(userId,reviewId, comment)
    alert('๋๊ธ์ ์ญ์ ํ์ต๋๋ค.');
  }
}


//๐์ง์ : create Comment 
const createAndUpdateComment = (comment,reviewId,userId) => {
  // setReviews([...reviews, review]);
  commentRepository.saveComment(userId,reviewId, comment);
}

//๐์ง์ : likes
const clickLike = (updatedReview) => {
  const newReviews = reviews.map((review) => {
    if(review.id !== updatedReview.id) {
      return review
    } else {
      return updatedReview
    }
  }) 
  setReviews(newReviews)
}

  const [deals, setDeals] = useState([]);
  // ๐ฅ ๋ ๋๋ง ์ ์ฝ๋ฐฑ ํจ์ ์คํ
  useEffect(() => {
    // dbDeals ์ฝ๋ ์ ๋ ํผ๋ฐ์ค ๊ฐ์ ธ์ด
    // ์์ฑ ์ผ์ ๋ด๋ฆผ์ฐจ์(์ต๊ทผ ์์)์ผ๋ก ์ ๋ ฌ
    const dq = query(
      collection(firestore, "dbDeals"),
      orderBy("createdAt", "desc")
    );
    // ์์ , ์ญ์  ์ค์๊ฐ ๋ฐ์
    // snapshot -> ๊ฐ๊ฐ์ docs์ ์ ๊ทผํ๊ธฐ ์ํด์ ์ฌ์ฉ
    onSnapshot(dq, (snapshot) => {
      const dealArray = snapshot.docs.map(doc => ({
      // ๊ฐ๊ฐ์ ๊ฐ์ฒด์ ๊ณ ์  id๋ฅผ ๋ง๋ค์ด ํ ๋น
        id: doc.id, ...doc.data()
      }));
      // ๊ฑฐ๋๊ธ ๊ฐ์ฒด ๋ฆฌ์คํธ๋ฅผ setDeals์ ํ ๋น
        setDeals(dealArray);
      })
  }, []);

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<FirstMain/>}></Route>
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/intro" element={<IntroList />}></Route>
          <Route path="/event" element={<EventIntro />}></Route>
          
          {/* ๐์ค์ง์ router */}
          <Route path='/reviews'  element={<ReviewPage reviews={reviews} />}/>
          <Route path='/reviews/:id' element={<ReviewDetail clickLike={clickLike} userId={userId} reviews={reviews}  createAndUpdateComment={createAndUpdateComment} deleteReview={deleteReview} deleteComment={deleteComment}/>}/>
          <Route path='/reviews/write' element={<ReviewWrite imageUploader={imageUploader} userId={userId} createAndUpdateReview={createAndUpdateReview}/>}/>
          <Route path='/review/revise/:id' element={<ReviewRevise userId={userId}  createAndUpdateReview={createAndUpdateReview} />}/>

          {/* ๐ฅ ๋ฐ์ ์ฃผ route ์์ */}
          <Route path='/deals' element={<DealPage deals={deals}/>} />
          <Route path='/deals/:createdAt' element={<DealDetail />} />
          <Route path='/deals/write' element={<DealWrite />} />
          <Route path='/deals/revise/:id' element={<DealRevise />} />
          {/* ๐ฅ ๋ฐ์ ์ฃผ route ๋ */}
          <Route path="/not-found" element={<NotFound />}></Route>
        </Routes>
        <footer>ํธํฐ</footer>
    </div>
  );
}

export default App;

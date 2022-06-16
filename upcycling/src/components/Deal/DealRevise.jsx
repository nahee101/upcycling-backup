import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useLocation, useNavigate } from "react-router-dom";

const DealRevise = () => {
    const location = useLocation();

    const deal = location.state.deal

    /* editing 모드인지 아닌지 */
    const [editing, setEditing] = useState(false);

    /* 업데이트 */
    const [newDCategory, setNewDCategory] = useState(deal.category);
    const [newDTitle, setNewDTitle] = useState(deal.title);
    const [newDHashtag, setNewHashtag] = useState(deal.hashtag);
    const [newDPrice, setNewDPrice] = useState(deal.price);
    const [newDContent, setNewDContent] = useState(deal.content);

    // 사진 업로드 관련
    const [attachment, setAttachment] = useState('');

    const navigate = useNavigate();

    /* editing 모드 끄고 켜기 */
    const toggleEditting = () => {
        setEditing((prev) => !prev)
        navigate(`/deals/${deal.createdAt}`, {state: {deal}})
    };

    /* 업데이트 */ // useEffect
    const onSubmit = async (event) => {
        event.preventDefault();
        
        // dbDeals에 업데이트
        await updateDoc(doc(firestore, `/dbDeals/${deal.id}`), {
            category: newDCategory,
            title: newDTitle,
            hashtag: newDHashtag,
            price: newDPrice,
            content: newDContent
        });
        setEditing(false);

        navigate(`/deals/${deal.createdAt}`, {state: {deal}})
        console.log(deal.id);
    };

    const onChange = (e) => {
        const {target: {name, value}} = e;
        
        if(name === 'category') {
            setNewDCategory(value);
        } else if(name === 'title') {
            setNewDTitle(value);
        } else if(name === 'hashtag') {
            setNewHashtag(value);
        } else if(name === 'price') {
            setNewDPrice(value);
        } else if(name === 'content') {
            setNewDContent(value);
        };
    };

    const onClearAttatchment = () => setAttachment('');

    return (
        <section>
            <form
            onSubmit={onSubmit}>
                {/* 카테고리 작성 */}
                <label>카테고리</label>
                <select>
                    <option name="category" value={newDCategory}>의류</option>
                    <option name="category" value={newDCategory}>잡화</option>
                    <option name="category" value={newDCategory}>뷰티/미용</option>
                    <option name="category" value={newDCategory}>반려동물</option>
                    <option name="category" value={newDCategory}>교육/체험 키트</option>
                    <option name="category" value={newDCategory}>기타 중고물품</option>
                </select> <br />

                {/* 제목 작성 */}
                <label>제목</label>
                <input
                name="title"
                onChange={onChange}
                value={newDTitle}
                type="text" 
                maxLength={80} /> <br />

                {/* 해시태그 작성 */}
                <label>해시태그</label>
                <input
                name="hashtag"
                onChange={onChange}
                value={newDHashtag}
                type="text" 
                maxLength={80} /> <br />

                {/* 가격 작성 */}
                <label>가격</label>
                <input
                name="price"
                onChange={onChange}
                value={newDPrice}
                type="number" /> <br />

                {/* 글 작성 */}
                <textarea
                name="content"
                onChange={onChange}
                value={newDContent}
                cols="30" rows="10" /> <br />

                <input 
                type="file" 
                accept="image/*" />

                {/* 거래 업로드 */}
                <input 
                type="submit" 
                value="수정" />
                            
                {/* 업로드할 사진 미리 보기 */}
                {attachment && (
                    <div>
                        <img 
                        src={attachment} 
                        width="50px" height="50px" />

                        <button
                        onClick={onClearAttatchment}>첨부 파일 삭제</button>
                    </div>
                )}
            </form>

            <button onClick={toggleEditting}>취소</button>

        </section>
    );
};

export default DealRevise;
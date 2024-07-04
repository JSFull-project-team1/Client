import React, { useState, useEffect } from 'react';
import S from './style';
import BookingItem from './BookingItem';
import NotBooking from './NotBooking';
import BookingDetail from './BookingDetail';
import ResetHeader from '../layout/ResetHeader';
import ScrollEvent from '../layout/ScrollEvent';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// 예약한 숙소리스트
const BookingListContainer = () => {
    ResetHeader();
    ScrollEvent();

    const userStatus = useSelector((state) => state.user.isLogin); //리덕스로 관리중인 사용자의 로그인 상태인지 확인
    const userObjectId = useSelector((state) => state.user.currentUser._id); // 현재 로그인한 유저의 ObjecId(_id)
    const [isReserved, setIsReserved] = useState(null); // 유저가 예약한 숙소가 있는지 여부 상태 (null은 컴포넌트가 아직 데이터를 가져오는 중)
    const [activeIndex, setActiveIndex] = useState(null); // 열린 아코디언 패널의 인덱스를 저장하는 상태 (null은 패널이 열리지 않은 상태)
    const [itemData, setItemData] = useState([]); // 예약한 숙소 데이터를 저장

    // bookingList 가져오기   
    useEffect(() => {
        const getBookingList = async () => {
            try{    
                    const response = await fetch(`http://localhost:8000/booking/bookingList`,{
                    method : "POST", // 사용자정보 노출 안되기 위해서 GET대신 PUT사용
                    headers : {
                        'Content-Type' : 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({
                        userId : userObjectId // user스키마를 참조하기 위해 bookingList에 userId가 userObjectId로 지정해둠
                    })
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // 서버로부터 가져온 bookingList 데이터
                const data = await response.json();
                if(data.length>0){ // 예약 내역이 있는 경우,
                    setIsReserved(true);// 예약한 숙소가 있어서 상태여부 true로 바꿔서 예약한숙소 보여줌
                    setItemData(data);// 뿌려줄 예약한 숙소 데이터 상태관리 시작
                }else{
                    setIsReserved(false);
                }
            }catch(error){ // 데이터를 못가져왔을 경우
                console.error("Error fetching bookingList:", error);
                setIsReserved(false);
            }
        }
        getBookingList();

    },[userStatus, userObjectId]) // 사용자가 바뀔때마다 새롭게 요청하기

      // 로그인 상태 확인 후 로그인 안된 경우 리디렉션
      if(!userStatus) {
        alert("로그인이 필요합니다.")
        // replace로 왔던 기록을 없애고 로그인 페이지로 이동(뒤로가기시 메인페이지로)
        return <Navigate to={"/signIn"} replace={true}/>
    }


    // 아코디언 클릭 핸들러 (BookingItem 부분 클릭시, BookingDetail 열림)
    const handleAccordionClick = (index) => {
        if (typeof index !== 'undefined') { // 클릭한 bookingItem이 있다면,
            setActiveIndex(activeIndex === index ? null : index); 
            // 이미 열려있는 bookingItem은 닫고(activeIndex=null)
            // 클릭한 bookingItem은 연다.(activeIndex=index)
        } else {
            console.log('Index is undefined or null');
        }
    };


    return (
        <S.BookingListContainer>
            <S.TitleWrapper>
                <h1 className="pageTitle">여행</h1>
                <h4 className="pageSubTitle">예정된 예약</h4>
            </S.TitleWrapper>
            <ul>
                {/* 로딩중일 때(데이터를 가져오는 중일 때 처리) */}
                {isReserved === null ? (
                    <div></div> // 빈화면
                ) : isReserved ? ( // 예약한 숙소 있을 때,
                    itemData.map((item, index) => (
                        <div key={index} style={{marginBottom :'50px'}}>
                            <BookingItem 
                                item={item}  
                                onClick={() => handleAccordionClick(index)}   
                                isActive={activeIndex === index} // isActive 속성으로 현재 항목이 활성 상태인지 여부를 전달(클래스 붙여 css변화 줌)
                                />
                                {/* activeIndex가 현재 항목의 index와 같으면 상세 정보를 표시 */}
                                {activeIndex === index ? (
                                <S.panel style={{ maxHeight: activeIndex === index ? '500px' : '0' }}>
                                    <BookingDetail 
                                        item={item}
                                        index={index}
                                        isActive={ activeIndex === index}
                                        />
                                 </S.panel>) : <div></div>}
                        </div>
                    ))
                ) : ( // 예약한 숙소 없을 때,
                    <NotBooking />
                )}
            </ul>
        </S.BookingListContainer>
    );
};

export default BookingListContainer;
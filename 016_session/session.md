# 로그인

1. Client -> ID, PW 입력
2. Server -> ID, PW 확인 후 맞으면 session DB에 생성(object{아이디, 만료시간...})
3. Server -> session object를 Client에 cookie로 전달(보통 js로 컨트롤 못하게 httponly 사용)
4. Client -> 전달받은 cookie + 내 블로그 글, 사진... Server로 전달
5. Server -> 받은 정보가 제대로 된 것인지 확인 후 DB에 블로그 글 등을 저장

---

* 서버 부하가 생긴다는 단점이 있어요. 그래서 대체 JWT(ㅈㅗㅅ, 영어발음 조심하셔야 합니다.)를 사용합니다.
* JWT는 Json web token으로 DB 없이 간단하게 세션과 쿠키를 제어할 수 있게 해줍니다.
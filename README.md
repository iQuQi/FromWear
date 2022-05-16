# FromWear
## 옷으로 시작되는 하루
React+AWS 웹 풀스텍 개발 프로젝트
https://main.d30b7gvovhfaij.amplifyapp.com/

## 스크린샷
<p float='left' align='center'>
  메인 / 게시판<br/>
  <img src='https://user-images.githubusercontent.com/67469315/157887848-bccbb84e-31a8-41b5-8d81-6191b9212cf7.PNG' width='500' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157888218-7ad0f4fb-7ee2-413e-a31b-fa316d33b90a.png' width='500' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157888432-743b37c6-7dfd-4a95-82c8-b7a8ff398882.PNG' width='500' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157888648-e51db232-3777-41fd-8b29-48bb9dc2649e.PNG' width='500' margin='auto'>
</p>
<p float='left' align='center'>
  글쓰기 / 게시물<br/>
  <img src='https://user-images.githubusercontent.com/67469315/157889051-9427db84-828e-4fb1-a573-8644fe17193d.png' width='500' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157889102-9912887d-b143-4be4-89d3-43f95ec9e46c.png' width='500' margin='auto'>
</p>
<p float='left' align='center'>
  문의 챗봇 / 알림<br/>
  <img src='https://user-images.githubusercontent.com/67469315/157889387-6480821c-614f-4b38-9e4a-023b64446eb2.PNG' height='300' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157889401-ffdfdc29-e5f1-4a26-a47d-9c43c95d5a9e.PNG' height='300' margin='auto'>
</p>
<p float='left' align='center'>
  검색<br/>
  <img src='https://user-images.githubusercontent.com/67469315/157885815-6958ac39-fea7-474e-aa8a-b203d9f298ce.png' width='500' margin='auto'>
</p>
<p float='left' align='center'>
  마이페이지<br/>
  <img src='https://user-images.githubusercontent.com/67469315/157889301-f5fbf07d-20cf-44f9-9b37-aee9e6c96197.PNG' width='500' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157889334-250dd3de-7e7a-4baf-99f4-555e828fb1f7.PNG' width='500' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157885073-7d536a8c-9762-49a4-905b-b61cdb0f43ae.png' width='500' margin='auto'>
</p>
<p float='left' align='center'>
  유저페이지<br/>
  <img src='https://user-images.githubusercontent.com/67469315/157885484-7afe71dd-eb10-4b78-a6fb-747a620ad2e3.png' width='500' margin='auto'>
  <img src='https://user-images.githubusercontent.com/67469315/157885343-353cedc7-0738-41d2-8d30-29d46f6bbe55.png' width='500' margin='auto'>
</p>
<p float='left' align='center'>
  피드<br/>
  <img src='https://user-images.githubusercontent.com/67469315/168540040-4086bc35-9395-4a30-b157-8a3a0948c826.png' width='500' margin='auto'>
</p>


## Git 사용법 ⭐중요중요⭐
- git branch : 현재 브랜치 확인<br>
- git checkout A : A 브랜치로 이동 -> 이동하기 전 현재 브랜치를 push(or commit?) 해두고 가야 함<br>
- git push origin A : 현재 브랜치의 업데이트 내용을 원격의 A 브랜치에 push<br>
- git pull origin A : 원격의 A 브랜치에서 pull을 받아서 현재 브랜치와 자동 merge<br>
- git merge A : 현재 브랜치로 A 브랜치의 내용을 merge함 -> 즉 현재 브랜치만 변화가 생기는 것<br>
- gitlab으로 push 하고 싶다면 git push gitlab A
- 1️⃣평소: 구현할 기능의 브랜치에서 작업 -> 그 브랜치에 push <br>
- 2️⃣merge : main으로 이동 -> git merge A -> git push origin main<br>
- 3️⃣충돌 : <br>
  - CONFLICT가 났다고 알려주면 어떤 파일에서 문제가 생긴지 알아보자 <br>
  - 그 파일에서 <br>
    HEAD <br>
    내용1<br>
    =====<br>
    내용2<br>
    를 찾은 후 내용1과 내용2 중 맞는 코드를 남기고 나머지 내용과 HEAD, ===를 지워주고 저장<br>

## 코딩컨벤션
파일 이름 : pascal case <br>
변수 명 : snake case

## 실행방법
`npm install` <br>
`npm start`

## 이미지 비율
- 1 : 1.54

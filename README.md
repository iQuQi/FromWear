# FromWear
## 옷으로 시작되는 하루
소프트웨어 스튜디오2 React+AWS 웹 풀스텍 개발 프로젝트

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


# SALIN_ASSIGNMENT
## * 실행 방법
- .env 파일
```bash
PORT = 서버 포트번호

DB_HOST = localhost

DB_USERNAME = DB 유저명

DB_PASSWORD = DB 비밀번호

DB_NAME = DB명
```
**서버 실행 전 반드시 데이터베이스를 생성해주세요!**  

기본 사용자 생성('user1') 및 테이블 자동 생성을 위해 **처음으로 서버 실행 시 ```npm run intialize```로 실행 부탁드립니다.**

그 후 실행은 ```npm start```로 해주시면 됩니다.

기본으로 생성되는 사용자명은 '**user1**' 입니다.

## 1. 프로젝트 구조
```bash
├── src             # 소스 폴더
    ├── controllers     # API 요청/응답 실행
    ├── entities        # Model과 동일
    ├── interfaces      # interface 모음
    ├── middlewares     # 사용자 지정 미들웨어
    ├── modules         # 사용자 지정 모듈(http status 및 http message 등의 정보)
    ├── routes          # 요청에 따른 분리
    └── services        # 데이터 가공(서버 저장소와 관련된 기능)
```
## 2. 사용 기술
### Backend 
![node](https://img.shields.io/badge/-node.js-sucsess) ![express](https://img.shields.io/badge/-express-gray) ![type-script](https://img.shields.io/badge/-TypeScript-blue)

### Database  
![MySQL](https://img.shields.io/badge/-MySQL-00758F) ![TypeORM](https://img.shields.io/badge/-TypeORM-D941C5)
## 3. 구현 과정
### I. 요구사항 분석
게시판 기능을 제공하며, 댓글과 대댓글 기능이 있는 가능한 API 서버입니다.
1. 게시글을 작성하기 위해서 사용자 정보가 제공되어야 합니다.
2. 게시글 수정 및 삭제는 해당 글의 작성자만 가능합니다.
3. 사용자는 어떠한 게시글에 대한 댓글, 대댓글에 대한 작성 권한이 있습니다.
4. 댓글 및 대댓글은 기본적으로 날짜순으로 정렬됩니다.

### II. DB 설계
<img width="800" alt="스크린샷 2022-09-03 오후 4 22 10" src="https://user-images.githubusercontent.com/48710060/188260518-7ecb22e6-373e-4e28-a532-d18c92db9e04.png">

### III. API 명세
<img width="800" alt="스크린샷 2022-09-05 오전 12 07 39" src="https://user-images.githubusercontent.com/48710060/188320398-b058816a-5f6a-4d70-b2e1-d217111e43af.png">

- API 명세서 전체보기 링크  
https://docs.google.com/spreadsheets/d/e/2PACX-1vSucQ3qDL5XP6j0Z-PNJ6ZUG40tvWpF3TfNFvvU6C9G0Icg9Hew_WTFrpVGvqW3icJl0NsTcXNcgWIF/pubhtml

### IV. 프로젝트 설정
- package.json, server.js, tsconfig.json, nodemon
- Modules 추가
- ERD Model 코드화(/entities/*)

### V. Routes, Controllers, Services 구현

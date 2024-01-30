## [백엔드 개발자-경력] 김봉연

nestjs + typeorm + mysql

## **구동 방법:**

1. **서버 구동 방법:**

```bash
$ docker-compose up
```
첫 구동시 db에 resourse 스키마가 없어 오류가 발생할 수 있습니다.

2. **DB IMPORT:**
    - 해당 DB는 공통코드를 사용하였습니다.
    - 첫 구동시 db에 resourse 스키마가 없어 오류가 발생할 수 있습니다.
    - root경로에 dump.sql이 있습니다. mysql에 import해주시면됩니다.
    - 스키마명은 `resourse` 입니다.

## **요구사항:**

1. **회원가입 API:** (구현완료)


2. **로그인 API:** (구현완료)


3. **비밀번호 변경 API:** (구현완료)


4. 회원 목록 조회 API (구현완료)

`import한 table에 보시면 관리자 계정이 있습니다.`
`email: admin@admin.admin`
`passwd: admin`

## **선택적 도전 과제:**

- 회원가입시 이메일 인증 기능을 추가하세요. (구현완료)

`이메일인증의 경우 .local.env파일의 MAIL_USER, MAIL_PASS에 각각
smtp지원 이메일의 이메일과 비밀번호를 적어주시면 사용하실 수 있습니다.
api에서 "회원가입신청" 실행 후 이메일 발송.
이후 회원가입승인 api에서 코드를 입력하여 실행하면 회원가입이 됩니다.`

- Refresh 토큰을 사용하여 토큰 재발급 기능을 추가하세요. (구현완료)


- 로그인 시도 제한 기능(최대 5회)을 추가하세요. (구현완료)


- 중복 로그인 방지 기능을 추가하세요. (구현완료)

## **API 명세서:**

root경로의 `api명세`폴더의 index.html파일로 확인하실 수 있습니다.

swagger를 추가해 놓아서 http://localhost:3000/api 에서 편히 api를 테스트하실 수 있습니다.

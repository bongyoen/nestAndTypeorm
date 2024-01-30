[//]: # (<p align="center">)

[//]: # (  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>)

[//]: # (</p>)

[//]: # ([circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456)

[//]: # ([circleci-url]: https://circleci.com/gh/nestjs/nest)

[//]: # (  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>)

[//]: # (    <p align="center">)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>)

[//]: # (<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>)

[//]: # (<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>)

[//]: # (<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>)

[//]: # (<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>)

[//]: # (<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>)

[//]: # (<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>)

[//]: # (  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>)

[//]: # (    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>)

[//]: # (  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>)

[//]: # (</p>)

[//]: # (  <!--[![Backers on Open Collective]&#40;https://opencollective.com/nest/backers/badge.svg&#41;]&#40;https://opencollective.com/nest#backer&#41;)

[//]: # (  [![Sponsors on Open Collective]&#40;https://opencollective.com/nest/sponsors/badge.svg&#41;]&#40;https://opencollective.com/nest#sponsor&#41;-->)

## 백엔드 개발자 경력 김봉연

nestjs + typeorm + mysql

## **구동 방법:**

1. **서버 구동 방법:**

```bash
$ docker-compose up
```

2. **DB IMPORT:**
   - 해당 DB는 공통코드를 사용하였습니다.
   - root경로에 dump.sql이 있습니다. mysql에 import해주시면됩니다.
   - 스키마명은 `resourse` 입니다.

## **요구사항:**

1. **회원가입 API:** (구현완료)
    - `(일반회원) 사용자는 이메일과 비밀번호로 회원가입할 수 있어야 합니다.` 
    - 이메일은 중복되지 않아야 합니다.
    - 비밀번호는 안전한 방식으로 저장되어야 합니다.


2. **로그인 API:** (구현완료)
    - 이메일과 비밀번호로 로그인할 수 있어야 합니다.
    - 로그인 성공 시 JWT 토큰을 발급합니다.


3. **비밀번호 변경 API:** (구현완료)
    - 로그인한 사용자는 비밀번호를 변경할 수 있어야 합니다.
    - 새로운 비밀번호는 안전한 방식으로 저장되어야 합니다.


4. 회원 목록 조회 API (구현완료)
    - 시스템에 등록된 회원 목록을 조회할 수 있어야 합니다.
    - 단, 관리자만 조회 가능합니다.

## **선택적 도전 과제:**

- 회원가입시 이메일 인증 기능을 추가하세요. (구현완료)
- `이메일인증의 경우 .local.env파일의 MAIL_USER, MAIL_PASS에 각각 smtp지원 이메일의 이메일과 비밀번호를 적어주시면 사용하실 수 있습니다.`


- Refresh 토큰을 사용하여 토큰 재발급 기능을 추가하세요. (구현완료)


- 로그인 시도 제한 기능(최대 5회)을 추가하세요. (구현완료)


- 중복 로그인 방지 기능을 추가하세요. (구현완료)




## **API 명세서:**
root경로의 `api명세`폴더의 index.html파일로 확인하실 수 있습니다.













[//]: # ()
[//]: # ()
[//]: # ()
[//]: # (## Description)

[//]: # ()
[//]: # ([Nest]&#40;https://github.com/nestjs/nest&#41; framework TypeScript starter repository.)

[//]: # ()
[//]: # (## Installation)

[//]: # ()
[//]: # (```bash)

[//]: # ()
[//]: # ($ npm install)

[//]: # (```)

[//]: # ()
[//]: # (## Running the app)

[//]: # ()
[//]: # (```bash)

[//]: # (# development)

[//]: # ($ npm run start)

[//]: # ()
[//]: # (# watch mode)

[//]: # ($ npm run start:dev)

[//]: # ()
[//]: # (# production mode)

[//]: # ($ npm run start:prod)

[//]: # (```)

[//]: # ()
[//]: # (## Test)

[//]: # ()
[//]: # (```bash)

[//]: # (# unit tests)

[//]: # ($ npm run test)

[//]: # ()
[//]: # (# e2e tests)

[//]: # ($ npm run test:e2e)

[//]: # ()
[//]: # (# test coverage)

[//]: # ($ npm run test:cov)

[//]: # (```)

[//]: # ()
[//]: # (## Support)

[//]: # ()
[//]: # (Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If)

[//]: # (you'd like to join them, please [read more here]&#40;https://docs.nestjs.com/support&#41;.)

[//]: # ()
[//]: # (## Stay in touch)

[//]: # ()
[//]: # (- Author - [Kamil Myśliwiec]&#40;https://kamilmysliwiec.com&#41;)

[//]: # (- Website - [https://nestjs.com]&#40;https://nestjs.com/&#41;)

[//]: # (- Twitter - [@nestframework]&#40;https://twitter.com/nestframework&#41;)

[//]: # ()
[//]: # (## License)

[//]: # ()
[//]: # (Nest is [MIT licensed]&#40;LICENSE&#41;.)

## AI 이루다의 채팅 내용을 받아옵니다

- 공식 Api를 사용한 것이 아닌 '너티앱'의 채팅소켓에 연결하는 방식으로 작동합니다

- 테스트 코드는 sendbird를 사용해 채팅을 보내는 방식으로 구현되어 있습니다

- `/api`와 `/socket/ping-handler`는 sendbird 로그인에서 직접적으로 쓰이지 않으며, 본인의 userId와 accessToken을 구하는 과정에서만 사용됩니다.

- `main.ts` 예제코드는 AI 다온과 AI 이루다를 서로 대화하게합니다

## 콘솔 출력
![로그](/image/log.png)

## 친밀도
![친밀도](image/a.png)
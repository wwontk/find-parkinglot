# 시장가자! 주차장 찾아줘🚘
<img src="https://github.com/wwontk/parkingMarket/assets/114340740/0314e9af-d45e-4dca-8565-f87ead46cf09" width="800px"></img>

💡 차 끌고 시장 갔다가 주차할 곳이 없어 시장 주변만 빙글빙글 돌았던 경험이 있나요? 이젠 <주차장찾아줘>를 통해 편하게 시장 주변에 주차하세요!<br>
🗓️ 프로젝트 기간 : 2024.04.11 ~ 2024.04.20 (필요한 기능 계속 추가중)

## 목차
- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [트러블 슈팅](#트러블-슈팅)

## 프로젝트 소개
🚘 "장 보려면 차를 가져가야 할텐데... 근처에 주차장이 있으려나?" <br> 
주차장 찾아줘는 공공 api를 사용하여 시장 목록과 그 주변 공영주차장 정보를 통해 주차를 편하게 할 수 있도록 도와주는 웹 어플리케이션 입니다.

## 주요 기능
- 전국 시장 리스트 업 및 시장 주변 1km 내 공영주차장 검색
- 주차장 정보(운영정보, 요금정보)를 알 수 있으며 카카오맵api를 통해 위치 정보를 알 수 있음
- 회원가입 / 로그인 시 각 주차장에 리뷰를 남길 수 있음
- 시장 이름으로 검색 가능
- 프로필 사진 / 닉네임 수정
- 내가 쓴 리뷰 모아보기
- 리뷰 수정 및 삭제 기능
- 사용자와 실시간 채팅 기능

| 회원가입 | 로그인 | 홈화면 |
|:-:|:-:|:-:|
|<img src="https://github.com/wwontk/parkingMarket/assets/114340740/359b28df-df2e-46a8-98a9-32775de6d10b" width="200px"></img> | <img src="https://github.com/wwontk/parkingMarket/assets/114340740/5af8bf47-025e-46f0-954b-c5fb0fd871cf" width="200px"></img>   | <img src="https://github.com/wwontk/parkingMarket/assets/114340740/b0d7da4a-8a38-44d5-946f-429acc501475" width="200px"></img>   |
| 회원가입을 할 수 있어요 | 로그인을 할 수 있어요 | 홈화면에서 전국 시장의<br>정보를 알 수 있어요  |

| 프로필변경 | 검색 | 주차장 리뷰작성  |
|:-:|:-:|:-:|
|<img src="https://github.com/wwontk/parkingMarket/assets/114340740/afd363c6-6059-4725-b0c5-57b15e1b2ca3" width="200px"></img> | <img src="https://github.com/wwontk/parkingMarket/assets/114340740/e7413d03-a934-41a9-8727-5f75c9dacd9c" width="200px"></img>   | <img src="https://github.com/wwontk/parkingMarket/assets/114340740/e8751858-e40e-448d-a166-2a529cf8da16" width="200px"></img>   |
| 프로필을 변경할 수 있어요 | 시장을 검색할 수 있어요 | 주차장에 대한 리뷰를<br>작성할 수 있어요  |

| 리뷰 수정/삭제 | 내 리뷰 모아보기 | 프로필 수정 내용 리뷰에도 적용 |
|:-:|:-:|:-:|
|<img src="https://github.com/wwontk/parkingMarket/assets/114340740/8749c01e-1c57-4224-91ef-c1de8d4001cd" width="200px"></img> | <img src="https://github.com/wwontk/parkingMarket/assets/114340740/1b49f402-c41a-44ae-85d1-90b62690f10c" width="200px"></img>   | <img src="https://github.com/wwontk/parkingMarket/assets/114340740/67743255-3f8b-4ce9-8711-d7eeb7fe65ec" width="200px"></img>   |
| 리뷰를 수정하거나<br>삭제할 수 있어요 | 내가 쓴 리뷰들을<br>모아 볼 수 있어요 | 프로필을 수정할 시 이전에<br>작성했던 리뷰들도 함께<br> 수정돼요  |

| 주차장 길찾기 기능 | 실시간 채팅 |
|:-:|:-:|
|<img src="https://github.com/wwontk/find-parkinglot/assets/114340740/938951ea-ce34-415c-ab4d-73e1e906b9c5" width="200px"></img> | <img src="https://github.com/wwontk/find-parkinglot/assets/114340740/1b0e0070-ce58-47e6-8701-c19f403ccc57" width="430px"></img>   |
| 주차장 길찾기 기능을 제공해요 | 실시간으로 사용자와 채팅을 할 수 있어요 |


## 트러블 슈팅

### 🛠️ <a href="https://www.notion.so/API-b8d46c70e4594d619b65fcc87666d708">불필요한 API 호출 최소화</a>

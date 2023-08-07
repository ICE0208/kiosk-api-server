# kiosk-api-server API

---

# 유저 관련

## 회원가입 /user/register [`POST`]

### Request

- `id`: String
- `password`: String

### Response

- `ok`: Boolean
- `msg`: String

## 로그인 /user/login [`POST`]

### Request

- `id`: String
- `password`: String

### Response

- `ok`: Boolean
- `msg`: String

---

# 메뉴 관련

## 메뉴 추가 /menu/add [`POST`]

### Request

- `id`: String
- `password`: String
- `name`: String
- `text`: String
- `price`: Number
- `imageURL`: String
- `category1`: String
- `category2`: String

### Response

- `ok`: Boolean
- `msg`: String

## 메뉴 삭제 /menu/remove [`POST`]

### Request

- `id`: String
- `password`: String
- `name`: String

### Response

- `ok`: Boolean
- `msg`: String

## 모든 메뉴 리스트 얻기 /menu [`GET`]

### Request

- `id`: String
- `password`: String

### Response

- `ok`: Boolean
- `data`: { `menus`: [ menu1, menu2, ... ] }

## 카테고리로 메뉴 리스트 얻기 /menu/category [`GET`]

### Request

- `id`: String
- `password`: String
- `category1`: String[optional]
- `category2`: String[optional]

### Response

- `ok`: Boolean
- `data`: { `menus`: [ menu1, menu2, ... ] }

## 이름으로 메뉴 정보 얻기 /menu/name [`GET`]

### Request

- `id`: String
- `password`: String
- `name`: String[optional]

### Response

- `ok`: Boolean
- `data`: { `menus`: [ menu1, menu2, ... ] }

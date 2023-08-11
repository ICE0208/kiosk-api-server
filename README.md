# <span id="top"> kiosk-api-server API 🎵</span>

## <span>📍 목차 </span>

[👤 유저 관련](#user)<br>
[📜 메뉴 관련](#menu)<br>
[🔔 주문 관련](#order)<br>

---

# <span id="user">👤 유저 관련</span>

## 회원가입 /user/register [`POST`]

### Request

- `id`: String
- `password`: String

### Response

- `ok`: Boolean
- `msg`: String

<p align="right"><a href="#top">⬆️Top</a></p>

## 로그인 /user/login [`POST`]

### Request

- `id`: String
- `password`: String

### Response

- `ok`: Boolean
- `msg`: String

<p align="right"><a href="#top">⬆️Top</a></p>

---

# <span id="menu">📜 메뉴 관련</span>

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

<p align="right"><a href="#top">⬆️Top</a></p>

## 메뉴 삭제 /menu/remove [`POST`]

### Request

- `id`: String
- `password`: String
- `name`: String

### Response

- `ok`: Boolean
- `msg`: String

<p align="right"><a href="#top">⬆️Top</a></p>

## 모든 메뉴 리스트 얻기 /menu [`GET`]

### Request

- `id`: String
- `password`: String

### Response

- `ok`: Boolean
- `msg`: String
- `data`: { `menus`: [ menu1, menu2, ... ] }

<p align="right"><a href="#top">⬆️Top</a></p>

## 카테고리로 메뉴 리스트 얻기 /menu/category [`GET`]

### Request

- `id`: String
- `password`: String
- `category1`: String[optional]
- `category2`: String[optional]

### Response

- `ok`: Boolean
- `msg`: String
- `data`: { `menus`: [ menu1, menu2, ... ] }

<p align="right"><a href="#top">⬆️Top</a></p>

## 이름으로 메뉴 정보 얻기 /menu/name [`GET`]

### Request

- `id`: String
- `password`: String
- `name`: String[optional]

### Response

- `ok`: Boolean
- `msg`: String
- `data`: { `menus`: [ menu1, menu2, ... ] }

<p align="right"><a href="#top">⬆️Top</a></p>

---

# <span id="order"> 🔔 주문 관련</span>

## 주문 추가 /order/add [`POST`]

### Request

- `id`: String
- `password`: String
- `name`: String
- `tableNum`: Number

### Response

- `ok`: Boolean
- `msg`: String

<p align="right"><a href="#top">⬆️Top</a></p>

## 주문 삭제 /order/remove [`POST`]

### Request

- `id`: String
- `password`: String
- `orderId`: String

### Response

- `ok`: Boolean
- `msg`: String

<p align="right"><a href="#top">⬆️Top</a><

## 주문 상태 변경 /order/changeStatus [`POST`]

### Request

- `id`: String
- `password`: String
- `orderId`: String
- `status`: Number

### Response

- `ok`: Boolean
- `msg`: String

<p align="right"><a href="#top">⬆️Top</a></p>

## 모든 주문 리스트 얻기 /order [`POST`]

### Request

- `id`: String
- `password`: String

### Response

- `ok`: Boolean
- `msg`: String
- `data`: { `orders`: [ order1, order2, ... ] }

<p align="right"><a href="#top">⬆️Top</a></p>

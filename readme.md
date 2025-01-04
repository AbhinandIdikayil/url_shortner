
# Url shortner with analytics



## Implementation

- google auth
- custom alias for short url
- short url analytics  
- caching using redis
- Rate limiting
- Containarized
- Added CI
- AWS EC2 deployment



## Tech Stack

**Server:** Node, Express, Typescript, MongoDB, Redis


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
### Server
`PORT` = `3000`

`MONGO_URI` = `MONGODB  CONNECTION STRING`

`CLIENT_ID` = `GOOGLECLIENT_ID`

`CLIENT_SECRET` = `GOOGLE CLIENT_SECRET`

`REDIRECT_URI` = `REDIRECT_URI FOR CONSENT SCREEN`

`JWT_SECRET` = `JWT_SECRET`

`URL` = `PRESENT_SERVER_URL`

`REDIS_URL` = `REDIS_CLOUD_URL`

`REDIS_PORT` = `REDIS_PORT`

`REDIS_PASS` = `REDIS_PASSWORD`

## Run Locally

Clone the project

```bash
  git clone https://github.com/AbhinandIdikayil/url_shortner
```

Go to the project directory

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run build
  npm run start
```


## Description

## 1. User Authentication
Implement user registration and login endpoints to allow users to create accounts and authenticate themselves using **Google Sign-In only**, enhancing user experience.

---

## 2. Create Short URL API

- **Endpoint**: `/api/shorten`
- **Method**: `POST`
- **Description**: 
  Create a new short URL to facilitate easy sharing of long URLs, which can often be cumbersome and difficult to manage. This API will generate a concise link that redirects to the original URL, making it ideal for social media, emails, and other communication channels.

- **Request Body**:
  - `longUrl` (string): The original URL to be shortened
  - `customAlias` (string, optional): A custom alias for the short URL (if not provided, generate a unique one).
  - `topic` (string, optional): A category under which the short URL is grouped (e.g., acquisition, activation, retention).

- **Response**:
  - `shortUrl` (string): The generated short URL.
  - `createdAt` (datetime): The timestamp indicating when the short URL was created.



## 3. Redirect Short URL API


- **Endpoint**: ` /api/shorten/{alias}`
- **Method**: `GET`
- **Description**: Description: Redirect to the original URL based on the short URL alias, enabling seamless access to the long URL while tracking user engagement.


- **Response**: Redirect the user to the original long URL.


## 4. Get URL Analytics API

- **Endpoint** : `/api/analytics/{alias}`
- **Method** : `GET`
- **Description**: Retrieve detailed analytics for a specific short URL, providing insights into its performance, including total clicks and unique audience interactions.
- **Response**:
 - `totalClicks (number)`: Total number of times the short URL has been accessed.
- `uniqueUsers (number):` Number of unique users who accessed the short URL.
- `clicksByDate (array):` An array of objects containing date(consider recent 7 days) and click count.
- `osType (array):` An array of objects containing:
    - `osName (string):` The name of the    operating system (e.g., Windows, macOS, Linux, iOS, Android).
    - `uniqueClicks (number):` Number of unique clicks for that OS.
    - `uniqueUsers (number):` Number of unique users for that OS.
- `deviceType (array):` An array of objects containing:
    - `deviceName (string):` The type of device used (e.g., mobile, desktop).
    - `uniqueClicks (number):` Number of unique clicks for that device type.
    - `uniqueUsers (number):` Number of unique users for that device type.



## 5. Get Topic-Based Analytics API

- **Endpoint**: `/api/analytics/topic/{topic}`
- **Method**: `GET`
- **Description**: Retrieve analytics for all short URLs grouped under a specific topic, allowing users to assess the performance of their links based on categories.
- **Response**:
- `totalClicks (number):` Total number of clicks across all URLs in the specified topic.
- `uniqueUsers (number):` Number of unique users who accessed URLs in the specified topic.
- `clicksByDate (array):` An array of objects containing date and total click counts for all URLs under topic.
- `urls (array):` An array of URLs under the specified topic, each containing:
    - `shortUrl (string):` The generated short URL.
    - `totalClicks (number):` Total number of clicks for the short URL.
    - `uniqueUsers (number):` Number of unique users who accessed the short URL.


## 6. Get Overall Analytics API

- **Endpoint**: `/api/analytics/overall`
- **Method**: `GET`
- **Description**: Retrieve overall analytics for all short URLs created by the authenticated user, providing a comprehensive view of their link performance.
- **Response**:
- `totalUrls (number):` Total number of short URLs created by the user.
- `totalClicks (number):` Total number of clicks across all URLs created by the user.
- `uniqueUsers (number):` Total number of unique users who accessed any of the user's short URLs.
- `clicksByDate (array):` An array of objects containing date and total click counts for all URLs.
- `osType (array):` An array of objects containing:
    - `osName (string):` The name of the operating system (e.g., Windows, macOS, Linux, iOS, Android).
    - `uniqueClicks (number):` Number of unique clicks for that OS.
    - `uniqueUsers (number):` Number of unique users for that OS.
- `deviceType (array):` An array of objects containing:
    - `deviceName (string):` The type of device used (e.g., mobile, desktop).
    - `uniqueClicks (number):` Number of unique clicks for that device type.
    - `uniqueUsers (number):` Number of unique users for that device type.
# LinkStorage

LinkStorage is a my pet project for managing hyperlinks created with modern MERN stack.

## Features

-   Authentication and Authorization with JWTs
-   Confirmation e-mail at registration
-   Lots of unit tests
-   Beautiful design created with the world's most popular React UI framework - Material UI
-   Adaptive layout
-   All kinds of input field validations where possible to enhance user experience
-   Tricky css-animations
-   Tricky business logic on front-end
-   Typescript for reducers

### If you don't want to create a new user you are welcome to use existing with the following credentials:

-   email: *linkstorage@protonmail.com*
-   password: _test123_

## Live server

[https://links-storage.herokuapp.com/](https://links-storage.herokuapp.com/)

Have fun while checking :)

## How to run locally

I've been active user of unix-like operation systems for about 5 years so unfortunately I don't really know how to run it on windows.

For linux use the following snippet ( _Make sure you've already installed nodejs and npm_ )

```bash
git clone https://github.com/petr-shumskiy/LinkStorage.git &&
cd LinkStorage && cd client && npm install && cd ../server &&
npm install &&
wget https://www.dropbox.com/s/wfbsd3wtdt1x6c7/.env\?dl\=0 -O .env &&
npm run dev
```

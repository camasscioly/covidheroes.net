<a href="https://covidheroes.net/">
  <img src="public/img/logo.svg" width="100px" align="right" />
</a>

# COVID Heroes

[![Build Status](https://travis-ci.org/camasscioly/covidheroes.net.svg?branch=master)](https://travis-ci.org/camasscioly/covidheroes.net.)
[![Dependencies](https://img.shields.io/david/camasscioly/covidheroes.net.svg?style=flat)](https://img.shields.io/david/camasscioly/covidheroes.svg?style=flat)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/camasscioly/covidheroes.net)

###### [Website](https://covidheroes.net) | [Code of Conduct](https://github.com/camasscioly/covidheroes.net/blob/master/.github/CODE_OF_CONDUCT.md) | [Contributing](https://github.com/camasscioly/covidheroes.net/blob/master/.github/CONTRIBUTING.md) | [License](https://github.com/camasscioly/covidheroes.net/blob/master/LICENSE)

> COVID Heroes is a NodeJS webapp which provides centralized communication between medical institutions and PPE volunteers.

###### What can I do?

Most things you can do in email can be done in COVID Heroes

- Creating card-based offers/requests for resources
- User account management and tracking
- Reputation system for active contributors
- Location mapping and distance calculation
- Simple NodeJS backend with MongoDB adapters
- Email and SMS integration

Give it a spin: https://covidheroes.net/

## Getting Started

## Installation

```bash
git clone https://github.com/camasscioly/covidheroes.net.git
cd covidheroes.net
```

Note: You will need at least NodeJS 10.18.1+, VSCode 1.44+, and MongoDB 3+. You will also need to configure .env variables before launching.

## Environment Variables

```bash
# Environment Config
# Store your secrets and config variables in here
# reference these in code with process.env.ENV_VARIABLE

PORT=3000
DB_URL=mongodb://mongodb.example.com:27017
MAILGUN_API_KEY=example-mailgun-token

# Note: MongoDB URI must be in the mongodb:// protocol, the mongodb+srv:// is not supported
```

Rename `.env.example` to `.env` to be able to interact with `process.env` in NodeJS.

## Usage

COVID Heroes follows the latest maintenance LTS version of Node.

```bash
yarn
yarn dev
# production: yarn start
```

## Useful Links

- [The website](https://covidheroes.net) hosts the production version of the website.
- [Our Github Repository](https://github.com/camasscioly/covidheroes.net) contains the most updated code.
- [Our GoFundMe Page](https://www.gofundme.com/f/help-create-covid-heroes?utm_source=customer&utm_medium=copy_link&utm_campaign=p_cf+share-flow-1) is where you can donate and support us.
- [Our Instagram Page](https://instagram.com/covid_heroes_official) contains the latest announcements.
- [Our Producthunt Page](https://www.producthunt.com/posts/covid-heroes?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-covid-heroes) shows the latest feedback from indie makers.

## Made by Camas Science Olympiad

Camas High School SciOly is like an academic track meet, consisting of 23 events for both middle and high school divisions. While exploring disciplines such as chemistry, biology, earth science, physics, and engineering, students are able to develop valuable teamwork and study skills in a fun and challenging environment.

Find out more [about Camas Scioly](https://camasscioly.weebly.com).

( ᵔ ᴥ ᵔ )

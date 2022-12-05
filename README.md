# purrfect-creations

## Overview

Basic dashboard to display Alice's Purrfect Creations key business metrics.

To know more about the story behind the requirements click [here](./Story.md).

## Solution Stack

**Database:** Airtable per requirement.

**API:** NestJS/Express

**Web App:** React/nginx

## Running the solution

### Prerequisites

#### API

Duplicate `.env.example` which you can find in `api/` to a new `.env` file in the same path with the correct `AIRTABLE_API_KEY`.

To get the `AIRTABLE_API_KEY`, please refer to [this guide](https://support.airtable.com/docs/how-do-i-get-my-api-key) for more information.

#### Web

Duplicate `.env.example` which you can find in `web/` to a new file `.env` in the same path with the correct `REACT_APP_API_URL`.

### Local Enviornment

To run both the API and Web App, you can refer to both guides made available via their respective boilerplates:

- API via information found [here](./api/README.md).
- Web app via information found [here](./web/README.md).

### Docker

To ease deployment, this app was conatinerised using Docker which you can start via `docker compose up`.

## Further Notes

You can find multiple comments showcasing different decisions and potential improvements through out the code. These comments are searchable with the following keys: `TODO`, `REVIEW` and `NOTE`.

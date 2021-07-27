# Project Slidez

## What is slidez?

Slidez is a modern approach to presentations. Our moto is `"Speech is silver, silence is gold"` - an old quote, which emphasizes that hearing your audience is an important part of communication. We believe, that modern presentation frameworks lack feedback and communication, so we aim to aid this by adding different interactive elements, such as votes.

# Technical side

## Tech stack

- Backend
    - Java 11 - core backend
    - Spring - core backend framework
    - Lombok - boiler-plate reducing annotation framework
    - Mapstruct - automapper to reduce mapping overhead
    - Hibernate - ORM for easy(but not simple) data access
    - Flyweight - migration tool
- Databse
    - Postgresql
- Frontend
    - TypeScript - primary SPA implementation
    - JavaScript - google slides add-on
    - React - SPA library
    - Redux - state management
    - Redux-toolkit - async interactions, effect management
- Other
    - WebSockets - duplex communication

## Deployment
The project is deployed to AWS via elastic beanstalk. Github actions are used for CI.

## Code quality
Static analyzers are used for both frontend and backend projects to ensure basic code quality. Additionally, [quality criteria]() rules are enforced during code review and audit.

## Code review
We practice peer-review approach: each PR is checked by a fellow student and a bsa coach. **Two** approves are required for a PR to be merged into `develop` branch. Peers are assigned on a weekly basis and code review quality will be accounted in a weekly grade. These rules might be relaxed or become stricter starting from the week two depending on team's performance.

## Local development
We don't use docker to run local environment for now, but we use docker containers to run infrastructure(such as database) locally. To run the project you should do the following:
- (Optional) Run the infrastructure `./scripts/run-infrastructure.sh` or deploy Postgres locally
- Run migrations(if necessary)
- Run the backend via IDEA
- Run the fronted `cd slidez-fe-core/ && yarn run start` 

# Team

This project was created as a part of Binary Studio Academy 2021 - summer.

## Project vision

- [Andrii Karun]() - business and market analysis
- [Julia Shevchenko]() - project owner
- [Anatolii Ivanov]() - initial idea, technical specification

## Development
- [Kyrylo Lesohorskyi]() - infrastructure setup, system architecture, code review
- [Anatolii Ivanov]() - project management, code review, module-level architecture

And an amazing team of students that will be filled later

## Useful links

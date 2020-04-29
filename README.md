![Nest+GithubAction+Zeit+Postgres](https://i.imgur.com/da8acAY.png)

<p><img src="https://github.com/henriqueweiand/nestjs-to-do-list/workflows/Node%20CI/badge.svg"></p>

# NestJS To Do List

Testing project to apply some technologies and methodologies

**_Integrations_**

- ✅ Deploy on Github Actions
- ✅ Hosting Zeit
- ✅ NestJS
- ✅ Posgres on RDS

## Database structure

![Nest+GithubAction+Zeit+Postgres](https://i.imgur.com/qOKkBuu.png)

Don't ask me why the list of these tables ... was just a test of resources 🤪

#### Requirements

`` For lack of knowledge and for not having found material in research, I had to work around a problem when using the package `config` for deploying in ZEIT that made me create a file to identify when it is in production "/src/config/index.ts" ``

1. Database with external access
2. For production: configure `/src/config/index.ts` file
3. For development: configure `/config` the files in the folder that thin at the root of the project
4. Install dependencies `yarn install`
5. Create database

#### Setup for dev

1. Run project `yarn start:dev`
2. Access `http://localhost:3000/api`
3. Be happy 🤩

#### Putting into production

1. Create your repository on Github
2. Create Zeit account
3. Add the github project to your zeit account
4. In the Zeit project environment variables, in the production tab configure all variables as they exist in the file `/src/config/index.ts`
5. Get Zeit Token access
6. Put Zeit Token in secrets of github project with `ZEIT_TOKEN`
7. Commit your project
8. Be happy 🚀

#### Complementary material

This article helped me a lot! But there were some errors and adjustments during the process by the scope of this project in particular.
https://medium.com/@jmaicaaan/deploy-nest-js-on-zeit-now-with-github-actions-86bc226e7371

#### Changelog

- Tests on features
- Run tests on deploy

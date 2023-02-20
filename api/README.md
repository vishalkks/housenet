# housenet-backend
## Developer Getting Started
> - Download postgresql and configure a database with the name <code>housenet</code> and create a user for the database with corresponding credentials to that of the <code>DB_USERNAME</code> and <code>DB_PASSWORD</code> in the .env file.
>
>
> - Download relevant packages using <code> pip install -r requirements.txt </code>
> - Set <code>DEV</code> in .env to <code>True</code> (IMPORTANT TO SET IT BACK TO FALSE WHEN MERGING INTO MAIN)
> - Run application using <code>flask run</code>

## Interacting with the database
> - run <code>flash shell</code> in your directory holding this repository
> - create specified class object of your choosing. i.e. <code> user_ethan = User(username='ethan', password='password', email='ettan@ucsd.edu', role='ADMIN') </code>
> - Add class object to your database session. i.e. <code> db.session.add(user_ethan) </code>
> - Commit class object to the database and apply changes to the database through command <code> db.session.commit() </code>

## Changing Database Structure
In the case of updating tables by adding columns in models.py, due to the functiaonlity of Flask, there will be a need to migrate tables to gaurantee that tables are correctly updated. In the case that you indeed made a change to the models, make sure you run these commands in order:
> - <code> flask db init </code> (you only have to do this once so that the migrations folder is in your directory)
> - <code> flask db migrate </code> to generate a migration file
> - <code> flask db upgrade </code> to update the current database to the new database. (note that this needs to be done to every copy of the database when the new code is merged, i.e. on each dev machine, prod machine)

## CI/CD Deployment with Google Cloud Run
** Note that CI/CD Deployment with Google Cloud is already setup, and the steps below are for reference how to do it in the future.

### Manual deployment
> - verify that you have docker and google clouds CLI installed
> - run <code>docker build .</code> (if on mac m1, need to run <code> docker buildx build --platform linux/amd64 . </code>)
> - grab the IMAGE_ID of the docker image just created
> - run <code>docker tag <IMAGE_ID> gcr.io/<PROJECT_ID>/<NAME_OF_PROJECT></code> (you get this by going to GCP and viewing your project to get project_id and name of project)
> - run <code> gcloud init </code> and follow the steps to login to your google cloud account and then link it to the current gcp project_id
> - run <code> gcloud auth configure-docker </code>
> - go to gcp website -> container registry -> enable container registry API
> - find the repository name on <code>docker images</code>, then run <code> docker push <REPO_NAME></code> which pushes the docker image of the project to GCP manually (we will automate this process soon).
> - enable cloud build API on GCP -> go to cloud run -> create service -> configure settings and deploy
> - go to revisions on the same page and change Container port to 5000 to be in line with docker file
> - after confirming that manually uploading docker image works, can set up automatic deploy

### Automatic deployment
> - go to cloud build -> create trigger -> configure trigger and link it to your repository -> configuration = Cloud Build configuration file -> create
> - potential issue that you need to give cloud build settings you need to enable cloud run admin and service account user.
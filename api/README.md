# housenet-backend
## Getting Started
> - Download postgresql
>
> - Configure the .env file with user and user password
>
> - Download relevant packages using pip
>
> - Run application using python3 -m flask run

## Interacting with the database
> - run <code> flask shell </code> in your directory holding this repository
> - create specified class object of your choosing. i.e. <code> user_ethan = User(username='ethan', password='password', email='ettan@ucsd.edu', role='ADMIN') </code>
> - Add class object to your database session. i.e. <code> db.session.add(user_ethan) </code>
> - Commit class object to the database and apply changes to the database through command <code> db.session.commit() </code>

## CI/CD Deployment with Google Cloud Run
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
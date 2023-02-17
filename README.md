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
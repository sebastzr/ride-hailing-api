# Ride Hailing API

## Local setup

1. Clone the repo
2. Go to the root of the project and run `cp api/.env.example api/.env`
   - Here you need to provide the WOMPI PRIVATE KEY
3. At the root of the project run `docker-compose up --build`

## Try it

Using the postman collection:

1. Create an Acceptance Token
2. Tokenize a dummy Card
3. When you run the docker-compose, the seeds generate some rider ids, copy one.
4. Get the data from steps 1 - 2 - 3 and paste them into the Payment Sources request to create a new payment method.
5. With the payment method created you can start to Request Rides and Finish Rides.

## Run tests

1. `cd api`
2. `npm test`

# airhelp-task
QA Automation Engineer Task

## General information

The following project was done to do the performance testing of the Ladybug app.
The functional Test Scenario is as follows:
1. Creating new orders using /api/orders/ endpoint.
2. Accepting the previously created orders using the /api/orders/{order id} endpoint.

The performance Test Scenarios are (Scenarios are in script_post.js and script_post_docker.js prepared to be uncommented and/or modified to run):
1. Baseline test - fixed 500 vus for 10 minutes.
2. Peak test - 500 users for 50 minutes.
3. Stress test - to find the maximum number of vus api can handle - 5000 vus for 5 minutes. Be careful with starting the test!
4. Soak test - average number of vus (500) for 24h.
5. Spike test - starting with 500 vus, rapidly raising to 1200 and rapidly lowering to 50. Repeated three times.

For security reasons the test in present configuration takes around 15 minutes to complete. To test the release candidate version I would recommend running the test for around a hour.

## Getting Started

Open the Terminal and use the following command in a directory You want to download the repository.
```
git clone https://github.com/matstawski/airhelp-task.git
```
If You do not have git installed, visit the https://github.com/matstawski/airhelp-task website and download the ZIP file.

### Prerequisites

To run the tests in Docker environment, the installed Docker is required.

For running the tests on the local machine, without using Docker, You will need the k6.io installed on Your machine - please visit https://docs.k6.io/docs/installation for further informations.

The Ladybug app should be running and be available on http://localhost:8080.

### Running the tests

#### Running the tests locally

0. Open Terminal and navigate to the directory where the repository is.
1. Enter the command ``` k6 run script_post.js ```.
2. After the process is finished enter the command: ``` k6 run script_put.js ```.


#### Running the tests in Docker container

0. Open Terminal and navigate to the directory where the repository is.
1. Navigate to ./docker/
2. Enter the command: ``` docker build -t airhelp-test -f  Dockerfile.test .  ```
3. After build is complete enter the command: ``` docker run airhelp-test ```

## Authors

* **Mateusz Stawski**

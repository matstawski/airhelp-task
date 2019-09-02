# airhelp-task
QA Automation Engineer Task

## General information

The following project was done to do the performance testing of the Ladybug app.
The functional Test Scenario is as follows:
1. Creating new orders using /api/orders/ endpoint.
2. Accepting the previously created orders by the employee.

The performance Test Scenario is as follows:
1. Generating traffic on about 40% of the maximal vus.
2. Gradually raising the number of the vus to reach 100% of the expected capacity.
3. Sharply reduce the number of the vus to 0.
4. Sharply increase the number of the vus to 100% of the projected capacity.
5. Sharply reduce the number of the vus to 0.
6. Gradually increase the number of the vus to approximately 80% of the maximum capacity and run the test for a long time.

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

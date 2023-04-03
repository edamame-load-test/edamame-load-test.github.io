# Docs

## Installation

### Dependencies

In order to use the `edamame` command line interface or graphical user interface tools, a user must first create an [AWS Account](https://docs.aws.amazon.com/SetUp/latest/UserGuide/setup-prereqs-instructions.html) and install the following dependencies:

- [`AWS Command Line Interface`](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html): command line tool for managing AWS services.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/#kubectl): command line tool for working with Kubernetes clusters (ensure you have verson 1.14 or greater which supports Kustomization files).
- [`eksctl`](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html): command line tool for working with EKS clusters.
- [`Make`](https://www.gnu.org/software/make/): a build automation tool used to build executable programs and libraries from source code.
- [`Go`](https://go.dev/doc/install): the programming language used by K6.
- [`Helm`](https://helm.sh/docs/intro/install/): a package manager for Kubernetes.

Subsequently, please ensure the `AWS Command Line Interface` is configured locally. This can be achieved by executing `aws configure` from the command line and passing in the following necessary credentials: `AWS Access Key ID`, `AWS Secret Access Key`, and `Default region`. For more details on deriving these credentials, please see the [official docs](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html).

### Final Installation Steps

Once all the dependencies from the prior section have been installed, please execute the final installation steps:

- Clone the `edamame` github repository: `git clone git@github.com:team-aglr/edamame.git`
- Navigate to the root directory, and execute the commands:
  - `npm install`
  - `npm link`

## CLI

### edamame init

Before conducting any load tests with Edamame, a user must first create and configure the necessary AWS infrastructure by executing the command `edamame init`. The most time-consuming part of this process is the provisioning of an EKS Cluster, which can take up to approximately 20 minutes. The terminal will provide status updates to the user throughout this installation and configuration process.

<video controls>
  <source src="/videos/init.mp4"/>
</video>

### edamame grafana --start

To establish secure local access to the Grafana dashboard, which allows a user to visualize and analyze the results of their load test, execute the command `edamame grafana --start`. This command is usually run before conducting any load tests, so that a user can update their Grafana username and password login credentials (which by default are `admin` and `admin`), create a custom dashboard for viewing specific data that will be emitted during a load test, or navigate to the default HTTP and Websockets data dashboard, and see all load test data arrive in near real time.

<video controls>
  <source src="/videos/grafStart.mp4"/>
</video>

### edamame run

Before starting a load test, a user must first write a k6 test script that defines the number of virtual users to be simulated and their behavior. Subsequently, a user can begin a load test by executing the command `edamame run` and providing the relative path to the k6 test script, and optionally the desired name and desired number of virtual users per pod. If a name is not provided, a unique identifier will be generated and assigned to the test. Additionally, if a specific number of virtual users per pod isn't defined, the default configuration of 20,000 virtual users per pod will be used.

To minimize AWS infrastructure costs, Edamame only initializes and maintains load generating resources while a test is being executed. Before a test can run, Edamame needs to initialize these load generator resources, which can take a moment. The terminal will provide status updates to the user and inform them when the test starts. The terminal will also subsequently notify the user when a test has completed and when all the load generating resources are removed.

Full command with arguments: `edamame run --file {/path/to/test.js} --name "<desired name>" --vus-per-pod <num_vus>`

<video controls>
  <source src="/videos/run.mp4"/>
</video>

### edamame stop

While analyzing the results of a load test in the Grafana dashboard, a user may decide that their system's performance has degraded to a point where they would like to end the current test. A user can stop an actively running test by executing `edamame stop`.

<video controls>
  <source src="/videos/stopTest.mp4"/>
</video>

### edamame grafana --stop

When a user is done analyzing the results of the load test in Grafana, they can end their secure Grafana local access by executing the command `edamame grafana --stop`. This command will free up port 3000 for other processes to run on it.

<video controls>
  <source src="/videos/grafanaStop.mp4"/>
</video>

### edamame update

A user can update the current name of a test by executing `edamame update` and providing the current name and desired new name.

Full command with arguments: `edamame update --current "<current test name>" --new "<desired test name>"`

<video controls>
  <source src="/videos/update.mp4"/>
</video>

### edamame get --all

A user can view information about existing load tests by executing the command `edamame get --all`.

<video controls>
  <source src="/videos/getAll.mp4"/>
</video>

### edamame get --name

A user can view details about an individual test, including the test script contents, by executing `edamame get --name` and providing the test name.

Full command with arguments: `edamame get --name "<test name>"`

<video controls>
  <source src="/videos/getName.mp4"/>
</video>

### edamame delete

A user can delete a load test and all of its associated data from the database by executing `edamame delete` and providing the test name.

(Add caution bubble here with the following caption:) Warning: this action is permanent and cannot be undone.

<video controls>
  <source src="/videos/delete.mp4"/>
</video>

### edamame teardown

If a user no longer wants or needs to run load tests and has no desire to retain any existing load test data, they can delete all existing load test data and AWS infrastructure by executing the command `edamame teardown`.

(Add caution bubble here with the following caption:) Warning: this action is permanent and cannot be undone. All load test data will be deleted. To run a subsequent load test, a user will have to provision and configure new AWS infrastructure by executing `edamame init`.

<video controls>
  <source src="/videos/teardown.mp4"/>
</video>

## GUI

### Establish Access

import Placeholder from './assets/logo-light-green.png';

If a user prefers to work in a graphical user interface (GUI) rather than a command line interface, they can initialize a GUI by executing the command `edamame dashboard --start` after they have successfully finished executing the command `edamame init`. This command will also configure secure local access to the Grafana dashboard.

<video controls>
  <source src="/videos/dbStart.mp4"/>
</video>

From within the GUI, a user can upload a k6 test script, start a load test, view and delete information about existing load tests, and delete all existing AWS infrastructure and data.

### Launch Test

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200" height="200"/>
  <p> 🖼️Placeholder: Figure 1.0 launching a test with the GUI (image/video of uploading a test script + setting a name)</p>
</div>

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200" height="200"/>
  <p> 🖼️Placeholder: Figure 1.1 running a test with the GUI (video of running test (to show timer elapsing + edamame pods seesawing) - even if we're using the figma diagram mock ups of the dashboard instead of a screen record of the react app, we can create a video that demonstrates time elapsing + edamame pods moving)</p>
</div>

### View Tests

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200" height="200"/>
  <p> 🖼️Placeholder: Figure 1.2 viewing information about test(s) from the GUI - do we want multiple images here - one of the main page to show image of all tests listed in the table and one that shows the view where someone can look at the test script contents of a specific test </p>
</div>

### Delete Test

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200" height="200"/>
  <p> 🖼️Placeholder: Figure 1.3 deleting an individual test in the GUI </p>
</div>

### Delete All Test Data and AWS Infrastructure

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200" height="200"/>
  <p> 🖼️Placeholder: Figure 1.4 deleting a cluster from the GUI </p>
</div>

### Terminate Access

Once a user has finished using the GUI, they can end the local access by executing the command `edamame dashboard --stop`. This command will free up ports 3000 and 3001 for other processes.

<video controls>
  <source src="/videos/dbStop.mp4"/>
</video>

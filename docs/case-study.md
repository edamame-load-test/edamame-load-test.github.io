# Case Study

## 1. Abstract

Edamame is a distributed load testing framework for testing messaging applications and collaboration tools that use both HTTP and WebSocket services. It is built for medium-sized companies that need to support up to 200k concurrently connected users. Edamame collects and displays client-side metrics in real-time, which provides developers deep insight into their systems. The provided ability to dynamically start and stop tests makes Edamame safe to run in either a staging or production environment.

Creating a load tester with these features comes with a unique set of challenges. First, the load tester needs to test the target system with multiple protocols in tandem and ensure that the concerns of different protocols are thoroughly addressed. Second, the kind of traffic medium-sized companies need to simulate requires a distributed architecture, which adds significant complexity to the tool. Third, providing client-side metrics in real-time means systems need to be in place to collect, process, store, and visualize these metrics in a performant way.

Edamame provided an open-source, easy-to-use, plug-and-play solution to the above challenges.

## 2. Background: load testing

### a. What is load testing?

What happens when a web application gets more traffic than anticipated? Can the underlying infrastructure handle the traffic? Does the application slow down? Or—worst case scenario—does the application crash?

<!-- markdownlint-disable MD033 -->
import Placeholder from './assets/logo-light-green.png';

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️ Tweet or screenshot of Ticketmaster going down</p>
</div>

Overwhelming traffic is a frustrating reality for many internet users. Whether it's a popular online sale event like Black Friday or a highly anticipated concert, the surge of visitors to a website can cause it to slow down or even crash. Ticketmaster found out just how bad things could get when 14 million users trying to buy Taylor Swift tickets [crashed their site](https://www.businessinsider.com/ticketmaster-14-million-people-tried-buy-taylor-swift-presale-tickets-2022-11).

Developers, to ensure their application can handle this kind of situation, re-create high-traffic scenarios by performing load tests. **Load testing** is the process of simulating user load on a system and measuring how that system responds. In a load test, a set number of programmatically generated "virtual users" are automated to interact with the system in pre-defined ways. This process helps developers identify performance bottlenecks within a system and provides assurance that the system can maintain expected standards, even under heavy strain.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️Depiction of a simple load test</p>
</div>

For a web application, one way to perform a basic load test is to use an HTTP benchmarking tool, like [wg/wrk](https://github.com/wg/wrk). This involves sending frequent HTTP requests to a target endpoint in order to simulate bursty traffic, and seeing how that system responds.

```txt title="wrk command"
wrk --connections=400 --duration=30s http://127.0.0.1:8080/index.html
```

Despite the simplicity of this approach, load testing can have many levels of complexity. Depending on the developer's requirements, this can take many forms.

### b. Considerations when building a load tester

#### i. Client-side metrics

The first thing we need to consider is what metrics are we collecting.

Some load tests are more focused on server-side metrics, which include measurements like CPU usage and memory consumption for the target system. This informs a developer on the health of their system's server. In cases where server-side metrics are primary, these are often obtained by system monitoring tools outside the load tester's purview.

A developer also needs to understand how the end user's experience may change under heavy load, which is where client-side metrics come in. These provide important insight by measuring things like HTTP response time, which tells us the overall latency of the target system. Other important measurements include the number of failed HTTP requests. An increase in numbers for either of these could indicate that the system is starting to regress.

Next, we must determine how these measurements are analyzed. One option is to view a tabular summary. This makes results easy to parse and gives a high-level overview of how the system responded.  

```txt title="wrk summary"
Running 30s test @ http://127.0.0.1:8080/index.html
12 threads and 400 connections
Thread Stats   Avg      Stdev     Max   +/- Stdev
  Latency   635.91us    0.89ms  12.92ms   93.69%
  Req/Sec    56.20k     8.07k   62.00k    86.54%
22464657 requests in 30.00s, 17.76GB read
Requests/sec: 748868.53
Transfer/sec:    606.33MB
```

However, there are drawbacks associated with this approach, namely, it lacks granularity. The alternative is to plot individual data points along a time axis. This way, data is detailed enough to understand exactly when problems start to arise and we can also analyze causal relationships between different data points.

Another consideration is how long the developer has to wait until they see data. A summary presupposes that there is no more data to process; the test is complete. For a short test (say 30 secs), this may not be an issue, however, load tests can be very long (say 3 hours). In this case, developers have to wait until the end of the test to view the results. Instead of waiting through the duration of the test, load testers can output granular metrics in real time.

Real-time data output can be very useful because it allows developers to respond to developments in test results as they occur. For example, being able to stop a test once a certain threshold is reached. However, real-time processing is an engineering challenge, and may not be worth the additional complexity involved based on developer needs.

#### ii. Scale

Running load tests locally is limiting. It's difficult to simulate thousands of separate users on a single host. Even using a load testing tool with a fairly low memory footprint, a 2-core CPU host with 8GB of RAM can generate a maximum of about [6k virtual users](https://github.com/grafana/k6-benchmarks/tree/master/results/v0.42.0#ec2-m5large).

There are three main limiting factors to local load testing:

- **CPU**: The CPU is heavily utilized in a load test. If it is not powerful enough, it can become a bottleneck, slowing down the test and limiting the number of virtual users that can be simulated.
- **Memory**: Load tests running on a single host cannot generate more virtual users than the RAM will support. Load tests often use 1 - 20 MB per virtual user, so even with only 1000 VUs, you might need up to 20GB of RAM to run that load test.
- **Network**: If the network throughput is too low, the load test may not accurately simulate the real-world conditions of user traffic, resulting in inaccurate or unreliable test results. For instance, in our example host above the network bandwidth is [up to 10GB](https://aws.amazon.com/ec2/instance-types/m5/).

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️Depiction of a distributed load test</p>
</div>

If local resources do not allow a developer to reach the desired number of virtual users, then it's necessary to run a distributed load test. In a **distributed load test**, multiple hosts generate load. The hosts which create virtual users and run the test are often known as "load generator nodes" or "test runner nodes". These can be horizontally scaled to support the number of virtual users required.

#### iii. Testing environment

Another consideration is which environment we target in our load tests. Developers often use staging environments to mirror production environments. This provides a level of isolation that enables load tests to be conducted without fear of taking down any critical production services.

That being said, we may still want to run load tests in a production environment because this yields the most accurate results. Moreover, some companies (such as fast-growth startups) may not have the time or financial resources to implement a full duplicate staging environment. Finally, there might be overlapping resources between both staging and production. In this case, staging environments are not perfectly isolated, and care needs to be taken to prevent consequences to real end users.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️Depiction of staging and production potentially having overlapping resources</p>
</div>

Therefore if there is a risk to critical parts of the production environment, safeguards need to be put in place to protect the availability of production systems when running a load test.

## Background: HTTP + WS applications

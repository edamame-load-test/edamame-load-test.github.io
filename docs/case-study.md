# Case Study

## 1. Abstract

Edamame is a distributed load testing framework for testing messaging applications and collaboration tools that use both HTTP and WebSocket services. It is built for medium-sized companies that need to support up to 200k concurrently connected users. Edamame collects client-side metrics and displays data in near real-time, which provides developers with deep insight into their systems. The ability to dynamically start and stop tests makes Edamame safe to run in either a staging or production environment.

Creating a load tester with these features comes with a unique set of challenges. First, the load tester needs to test the target system with multiple protocols in tandem and ensure that the concerns of different protocols are thoroughly addressed. Second, the kind of traffic medium-sized companies need to simulate requires a distributed architecture, which adds significant complexity to the tool. Third, providing client-side metrics in near real-time means systems need to be in place to collect, process, store, and visualize data in a performant way.

Edamame provided an open-source, easy-to-use, plug-and-play solution to the above challenges.

## 2. Background: load testing

### a. What is load testing?

What happens when a web application gets more traffic than anticipated? Can the underlying infrastructure handle the traffic? Does the application slow down? Or—worst case scenario—does the application crash?

<!-- markdownlint-disable MD033 -->
import Placeholder from './assets/logo-light-green.png';
<div class="text--center" >
  <img src="https://preview.redd.it/adi71n2nzl0a1.jpg?width=960&crop=smart&auto=webp&v=enabled&s=43a31699ab3508f3eb31d20b6bd8c32c6ecbfb41" alt="Example banner" width="400"/>
  <p> 🖼️ Tweet or screenshot of Ticketmaster going down</p>
</div>

Overwhelming traffic is a frustrating reality for many internet users. Whether it's a popular online sale event like Black Friday or a highly anticipated concert, the surge of visitors to a website can cause it to slow down or even crash. Ticketmaster found out just how bad things could get when 14 million users trying to buy Taylor Swift tickets [crashed their site](https://www.businessinsider.com/ticketmaster-14-million-people-tried-buy-taylor-swift-presale-tickets-2022-11).

Developers, to ensure their application can handle this kind of situation, re-create high-traffic scenarios by performing load tests. **Load testing** is the process of simulating user load on a system and measuring how that system responds. In a load test, a set number of programmatically generated "virtual users" are automated to interact with the system in pre-defined ways. This process helps developers identify performance bottlenecks within a system and provides assurance that the system can maintain expected standards, even under heavy strain.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️Depiction of a simple load test</p>
</div>

For a web application, one way to perform a basic load test is to use an HTTP benchmarking tool, like [wg/wrk](https://github.com/wg/wrk). This involves sending frequent HTTP requests to a target endpoint in order to simulate bursty traffic, and seeing how that system responds.

```txt title="wrk command"
wrk --connections=400 --duration=30s http://127.0.0.1:8080/index.html
```

Despite the simplicity of this approach, load testing can have many levels of complexity. Depending on the developer's requirements, this can take many forms.

### b. Considerations when building a load tester

#### i. Client-side metrics

The first thing we need to consider is what metrics we are collecting.

Some load tests are more focused on server-side metrics, which include measurements like CPU usage and memory consumption for the target system. This informs a developer on the health of their system's server. In cases where server-side metrics are primary, these measurements are often obtained by system monitoring tools outside the load tester's purview.

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

That being said, this approach has challenges of its own. Data generated from load testing tends to be very "noisy", that is, it lacks consistency and reliability making it difficult to discern a trend. To do so, we can perform data smoothing, which would typically involve taking some kind of average at time intervals. However, when performing load tests data points tend to differ by orders of magnitude, for example, we might see a response time of 100ms as well as 10s. Because of this disparity, taking an average skews results.

Instead, it's more effective to find the 50th percentile, also known as the median. If your median is 200ms, now you know that 50% of response times were less than 200ms, and 50% were more. Looking at the tail end (>90%) of percentiles allows developers to understand the experience the majority of users have. For example, if the 99th percentile of response times is 200ms, it means that 99% of users have response times equal to or less than 200ms. In the context of load testing, therefore, looking at higher percentiles (90th, 95th, 99th) tends to be more telling than the median.

<div class="text--center" >
  <img src="https://loadium.com/wp-content/uploads/2021/01/f1-1-1200x601.png" alt="Example banner" width="400"/>
  <p> 🖼️Visualizing 99% percentiles</p>
</div>

Another consideration is how long the developer has to wait until they see data. A summary presupposes that there is no more data to process; the test is complete. For a short test (say 30 secs), this may not be an issue, however, load tests can be very long (say 3 hours). In this case, developers have to wait until the end of the test to view the results. Instead of waiting through the duration of the test, load testers can output granular data in near real-time.

Near real-time data output can be very useful because it allows developers to respond to developments in test results as they occur. For example, being able to stop a test once a certain threshold is reached. However, near real-time processing is an engineering challenge, and may not be worth the additional complexity involved based on developer needs.

#### ii. Scale

Running load tests locally is limiting. It's difficult to simulate thousands of separate users on a single host. Even using a load testing tool with a fairly low memory footprint, a 2-core CPU host with 8GB of RAM can generate a maximum of about [6k virtual users](https://github.com/grafana/k6-benchmarks/tree/master/results/v0.42.0#ec2-m5large).

There are three main limiting factors to local load testing:

- **CPU**: The CPU is heavily utilized in a load test. If it is not powerful enough, it can become a bottleneck, slowing down the test and limiting the number of virtual users that can be simulated.
- **Memory**: Load tests running on a single host cannot generate more virtual users than the RAM will support. Load tests often use 1 - 20 MB per virtual user, so even with only 1000 VUs, you might need up to 20GB of RAM to run that load test.
- **Network**: If the network throughput is too low, the load test may not accurately simulate the real-world conditions of user traffic, resulting in inaccurate or unreliable test results. For instance, in our example host above the network bandwidth is [up to 10GB](https://aws.amazon.com/ec2/instance-types/m5/).

<div class="text--center" >
  <img src="https://k6.io/blog/static/f6d6d11d1540298928886d94d481824f/06b13/1_-_li-load-testing-overview.png" alt="Example banner" width="400"/>
  <p> 🖼️Depiction of a distributed load test</p>
</div>

If local resources do not allow a developer to reach the desired number of virtual users, then it's necessary to run a distributed load test. In a **distributed load test**, multiple hosts generate load. The hosts which create virtual users and run the test are often known as "load generator nodes" or "test runner nodes". These can be horizontally scaled to support the number of virtual users required.

#### iii. Testing environment

Another consideration is which environment we target in our load tests. Developers often use staging environments to mirror production environments. This provides a level of isolation that enables load tests to be conducted without fear of taking down any critical production services.

That being said, we may still want to run load tests in a production environment because this yields the most accurate results. Moreover, some companies (such as fast-growth startups) may not have the time or financial resources to implement a full duplicate staging environment. Finally, there might be overlapping resources between both staging and production. In this case, staging environments are not perfectly isolated, and care needs to be taken to prevent consequences for real end users.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️Depiction of staging and production potentially having overlapping resources</p>
</div>

Therefore if there is a risk to critical parts of the production environment, safeguards need to be put in place to protect the availability of production systems when running a load test.

### c. Summary

Depending on developer needs, load testing can take many different forms. On the most basic level, we need to consider the data being collected, the required scale of the load test, and the environment being targeted.

Depending on an application's capability and complexity, more factors come into play. For example, messaging applications and collaboration tools have specific characteristics that need to be considered when determining what load testing approach should be taken.

In the next section, we take a look at how collaboration apps work and how these pose specific challenges that need to be answered by an effective load testing tool.

## 3. Background: Real-time collaboration apps

### a. What are real-time collaboration apps?

Collaboration apps are applications that include some kind of real-time communication aspect.

- **Messaging**: Slack, Discord, or Mattermost allow users to join rooms or channels and talk to each other in real time.
- **Whiteboarding**: Miro and Whimsical give teams a visual platform to collaborate on brainstorming aids and graphic deliverables like mind maps or flow charts.
- **Productivity**: Coda is a versatile tool that enables teams to perform project management by collaborating on a series of documents, tables, and tasks.

All of these tools benefit from [low-latency data transfer](https://ably.com/blog/what-it-takes-to-build-a-realtime-chat-or-messaging-app) (~100ms) and the ability for a server to push data directly to a client without relying on a request. To achieve these goals, the above collaboration apps rely on WebSockets.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️Depiction of the difference between HTTP and WS</p>
</div>

**WebSocket** is a protocol that operates over HTTP and uses the underlying TCP layer to create a persistent connection between client and server. It allows for bi-directional communication between the client and server, unlike HTTP, in which a client must first initiate communication with a server by issuing a request. This persistent connection provided by WebSockets allows the server to stream events back to a client in real time.

On the client side, a WebSocket object is required in the browser to facilitate this persistent connection. The WebSocket object uses event-based asynchronous callbacks to handle incoming messages from the server, and can also send messages to the server. WebSocket messages, unlike HTTP, don't require a response.

On the server side, to connect with clients, a separate WebSockets server must be added to the architecture. Now we have traffic existing in two separate places; the WS server and the HTTP server.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️Depiction of more complex system including traffic split over two protocols</p>
</div>

### b. Considerations when developing a collaboration app

#### i. WebSocket performance

WebSocket is an entirely different protocol from HTTP. As a result, performance is measured and tracked differently. With HTTP, we are focused on the request-response cycle, so metrics like latency for HTTP responses based on differing levels of traffic are paramount. However, for WebSockets, as no response is required, messages can be considered "fire and forget". In this case, we're more concerned about the persistent connection, for example, how many connections have been dropped vs. how many connections are currently being maintained.

#### ii. Supporting separate protocols

Needing to support two entirely different protocols introduces significant complexity to the system. For example, HTTP and WebSocket servers could have different scaling needs. To determine the scalability thresholds of each, load tests would need to be run that address both traffic patterns.

WebSocket clients often exhibit different behavior from those that are connected via HTTP. When an HTTP server fails, traffic can be load balanced and re-directed to a replica the next time a request is issued. However, if a WebSocket server fails, all clients are disconnected from that bi-directional communication simultaneously. Often, they all try to reconnect at the same time, which can create a "thundering herds" problem. Applications that support both HTTP and WebSockets need to be able to handle this.

#### iii. Fan-out messaging pattern

Fan-out messaging pattern utilizes a one-to-many arrangement to emit messages, which enables a collaboration app to distribute messages to all users connected to the same channel in real-time. A message could be a literal chat message, a user's mouse movements, entering text into a shared document, drawing something on a whiteboard, or any other sort of data that needs to be propagated back up to collaborators.

For the aforementioned apps, the message being published can take the form of either an HTTP request or WebSockets message from the client. To enable real-time communication, messages are sent back up to subscribed collaborators vis WebSockets. Depending on how large the channel is, one published message can lead to a sizeable fan-out.

For example, if you send a message to a Slack channel with 1k subscribers, the single POST request that sends the message turns into 1k WebSocket messages being emitted.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️Fanout</p>
</div>

<!-- markdownlint-disable MD024 -->
### c. Summary

Managing a real-time collaboration app poses a unique set of circumstances that developers must take into consideration. WebSocket servers and clients behave differently than their HTTP counterparts, so additional scenarios like WebSocket performance, thundering herds, and fan-out messaging must be accounted for. To ensure this, developers perform load tests that accurately mimic these kinds of behaviors.

## 4. Load testing for collaboration apps

Due to the rise of remote work, applications in this space can grow very quickly. For example, [Miro grew from 12k to 100k concurrently connected users](https://medium.com/miro-engineering/reliable-load-testing-with-regards-to-unexpected-nuances-6f38c82196a5) in the space of a year. Fast growth requires scalability, which can compound the challenges listed above. To understand how such a system responds to stress and see if it remains operational amidst an influx of connections, load tests should have a certain set of characteristics to be effective.

- It needs to ensure that all architecture components supporting both HTTP and WebSocket are sufficiently tested. This means that the virtual users should be able to mimic both an HTTP and WebSocket client.
- It should be able to generate up to 200k virtual users per test to support the needs of medium-to-large collaboration apps.
- It should be able to collect and display granular data pertaining to both HTTP and WebSocket concerns. To ensure the safety of target systems in an agnostic environment, this data should be emitted in near real-time.

### a. Generating HTTP and WebSocket traffic

Typically, the HTTP server and WS server need to be tested in tandem to get an accurate picture of how the system responds to load. For applications that only support HTTP endpoints, an HTTP load tester is sufficient. However, collaboration apps cannot rely on HTTP requests alone for load testing, as client traffic is divided between two different protocols. HTTP-focused load tests do not cover all components of a collaborative application's architecture.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️An image that shows how a traditional API blaster only tests part of the system / re-working of the first koi pond diagram. </p>
</div>

In an HTTP load test, requests are sent to the HTTP server. This causes data to be sent to the WebSocket server in response so that the messages received can be propagated to subscribed users. However, if the virtual users in the load test do not maintain persistent WebSocket connections, the WebSocket server never has to emit any messages (there are no active subscribers). This means that a critical part of the architecture never has to sustain any load.

Due to fan-out messaging, the number of WebSocket messages that must be sent (and therefore, the amount of load the WebSocket server must sustain) can be orders of magnitude different from the amount of HTTP requests being received. It is of vital importance that the virtual users in the load test accurately simulate the persistently connected WebSocket clients.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️An image that shows how a system can be tested holistically, with persistently connected clients to show how it </p>
</div>

This limits the choice of load testing tools to those that support both HTTP and WebSockets. The load tester should also collect meaningful metrics pertaining to both protocols, which may or may not be included.

### b. Scaling to 200K concurrent users

During their Series A stage, Miro grew from 12k to 100k currently connected users in the space of a year. Typically, a company in the Series A stage wants to see growth like this; their goal is to be rapidly and predictably scaling, and to ensure that their supporting infrastructure is scaling in tandem with the number of users.

While the actual number of daily active users varies from company to company, our research shows that late-stage Series A companies are typically around the 100k range. An effective load tester for a company in this phase of growth should allow tests of up to 100% of this number, which we estimate to be about 200k virtual users.

Running load tests that generate 200k virtual users necessitates a distributed architecture, due to the amount of compute resources required. In most cases, this means moving to the cloud. This requires a number of different cloud-based components, meaning we need a system to manage the required infrastructure.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p> 🖼️Visualizing why syncing nodes is important</p>
</div>

One major concern with distributed load tests is how to synchronize the load generators. Load tests often have a predefined pattern for how the number of virtual users is ramped up and down over the duration of the test. Different patterns test how systems respond to different scenarios.

For example, a load test may ramp up from zero to 20k VUs over the course of a five-minute interval, and then immediately start ramping back down to zero VUs over the next five minutes. If this test is spread across two nodes, then both nodes must start the test at exactly the same time. Otherwise, the test will never reach 20k VUs at its peak.

Therefore, we need a way to synchronize load generator nodes to ensure they all start ramping up the load at the same time and stay in line with each other to match the predefined pattern of load.

Providing a way to manage load generator nodes also gives the load tester the ability to stop the test, in case critical aspects of a production environment are threatened by the additional load.

### c. Collecting and displaying data in near real-time

Fast-growth companies may not have time to set up isolated staging environments to perform tests (growth could happen overnight). A load testing tool can take the dangers associated with this into consideration by providing near real-time results. If systems begin to show signs of degrading, the test can be stopped immediately.

To facilitate near real-time visualization of data, the load tester requires a stream processing approach as opposed to batch processing. Batch processing presupposes the data has a defined start and finish, meaning that batch processing delivers results like end-of-test summaries. This is a time consuming approach that does not suit the time-sensitive nature of load test data for tests targeting an agnostic environment.

<div class="text--center" >
  <img src="https://hazelcast.com/wp-content/uploads/2021/12/diagram-stream-processing.png" alt="Example banner" width="400"/>
  <p> 🖼️Graphic showing simple stream processing system</p>
</div>

Stream processing, on the other hand, assumes data is unbound and arrives continually over time. To derive analytics like percentiles from the data stream, the system splits data up into time intervals. All the data points that fit into one of these "windows" are aggregated and sent to storage. This comes with challenges of its own.

More virtual users mean more data. The amount of data depends on a variety of factors, including the type of load test, which load testing tool is used to conduct the test, which metrics are being collected, and how frequently they are being collected. For example, a test in which virtual users are making HTTP requests each second would result in a higher amount of data than a test in which a request is made every ten seconds. Stream processing data in vast quantities could be difficult.

Finally, we need a storage method and an effective visualization tool that can show all this data in an understandable way. The visualization tool can then continually pull from storage as data is added, allowing developers to see analyzed data as the test executes.

## 5. Existing solutions

There are many existing solutions for load testing tools in general, for example, k6, Locust, JMeter, and Artillery, to name a few. While all these companies offer open-source load testers, they are typically meant for local use, meaning resources for producing high numbers of virtual users are limited to one host. However, our specifications require supporting up to 200k users per test, which necessitates a distributed architecture.

It is possible to use an open-source tool in a distributed manner, but it involves managing all the necessary cloud infrastructure yourself. For example, [JMeter offers a guide](https://jmeter.apache.org/usermanual/jmeter_distributed_testing_step_by_step.html) and controller construct to help users run distributed tests. If a company has very specific needs, it may even consider developing its own internal load testing tool rather than extending the capabilities of an open-source tool by distributing the test.

This approach, however, involves significant complexity. Many open-source load testing tools offer a managed cloud service that abstracts away all the challenges of distribution. While this is a convenient option, it does come with limitations such as data ownership and cost.

Edamame aims to bridge the gap between open-source and paid cloud services by providing a load testing tool with built-in distribution management that's simple to deploy and run.

### a. DIY

A number of real-world collaborative apps have taken a DIY approach to either develop a custom load testing tool or extend an existing open-source tool and manage the distribution.

<div class="text--center" >
  <img src="https://slack.engineering/wp-content/uploads/sites/7/2021/04/Screen-Shot-2021-04-21-at-4.30.30-PM.png" alt="Example banner" width="400"/>
  <p> 🖼️Koi Pond</p>
</div>

Slack built [Koi Pond](https://slack.engineering/load-testing-with-koi-pond/), which is an internal tool that leverages a distributed Kubernetes architecture in order to ensure sufficient connected virtual users. Load is generated using a custom tool written in Go, and virtual user behavior is dictated by a JSON file. Koi Pond streams data which is displayed in a Grafana dashboard as a test runs.

Miro facilitates WebSocket load testing by extending JMeter with a plugin and custom scripts. To mitigate the costs associated with running load tests on AWS, they use temporary Spot instances which are only active for the duration of the test.

For developers looking to build their own custom distribution solution, [AWS](https://aws.amazon.com/solutions/implementations/distributed-load-testing-on-aws/) and [Google Cloud](https://cloud.google.com/architecture/distributed-load-testing-using-gke) both have guides on how to manage the underlying infrastructure to facilitate this. In this approach, the developer takes on all responsibility for the challenges associated with running a distributed test.

### b. Cloud-based services

If a developer does not wish to manage the complexity involved with a distributed load test, using a cloud-based solution abstracts away many of the challenges involved. Cloud-based solutions are paid services that handle all underlying infrastructure for running tests, data collection, data processing, near real-time visualization, and data storage. This makes it very easy for developers to run large-scale load tests.

That being said, cloud-based solutions also have their trade-offs. They can be very costly. Moreover, because all data storage is managed, a user does not retain control over their own data. Different cloud-based solutions will place different limits on how long data is retained.

|                  | k6 Cloud           | Gatling Enterprise                                                                       | BlazeMeter (JMeter)                 | Artillery                                                                   |
|------------------|--------------------|------------------------------------------------------------------------------------------|-------------------------------------|-----------------------------------------------------------------------------|
| Price            | $1199 / month     | $900 dollars / month                                                                     | $499 / month                        | $1119 / month (Self-hosted on own AWS; users will incur additional charges) |
| Max VUs per test | 3000 virtual users | 240000 virtual users                                                                     | 5000 virtual users                  | No limit (1000 generators per test; VUs per generator is unspecified)       |
| Test duration    | 60 minutes         | 24 hours                                                                                 | 2 Hours                              | No limit                                                                    |
| Number of tests  | 100 tests          | 6000 "credits" (1 credit is 1 min of generator use; can use up to 6 generators per test) | 6500 "virtual user hours" per month | No limit                                                                    |

Another issue is cloud-based solutions are not as flexible. For example, the k6 open-source load tester is quite extensible, which allows developers to customize which metrics their load tests are tracking by default. However, the [k6 cloud platform does not support utilizing these extensions](https://k6.io/blog/extending-k6-with-xk6/), which compromises developer experience.

### c. An in-between

There are limited options when it comes to a distributed load testing solution that is both open-source and offers many of the benefits of a cloud-based service. [Artillery is one example of an open-source tool that allows for distributed load tests that are easy to deploy](https://www.artillery.io/docs/guides/guides/distributed-load-tests-on-aws-lambda), but it comes with significant drawbacks. Tests are run using AWS Lambda (AWS's serverless function offering), which limits them to a 15-minute duration. Distributed load tests run using Artillery also cannot be stopped mid-test.

Edamame lives in the liminal space between a DIY and a SaaS solution. It is open-source and provides many of the benefits of a cloud-based service like managed distribution and near real-time data visualization. It also addresses the limitation of these services by giving users full control over their own data. It is built with collaboration apps in mind and features meaningful metrics for both HTTP and WebSockets out of the box.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️A more high-level chart that compares Edamame and existing solutions</p>
</div>

Edamame is a specific tool built for a specific use case, so it has limitations as well. Applications that need to support levels of concurrency may not wish to utilize Edamame, as it does not support more than 200k virtual users per test. Edamame does not integrate into a CI/CD pipeline like GitHub Actions or Jenkins. Because Edamame targets collaborative apps, it does not support protocols outside HTTP and WebSockets.

## 6. Edamame architecture

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️High level overview of architecture</p>
</div>

Edamame contains six main components:

1. A CLI and GUI provide interfaces for the user to manage load tests. They communicate with the Edamame architecture which is deployed using AWS Elastic Kubernetes Service (EKS) in the user's AWS account.
2. The k6 operator receives test scripts from the user interface and is responsible for initializing and synchronizing a distributed test.
3. Load generators are pods hosted in a dedicated node group. They run the test script and simulate the virtual users needed to conduct the test.
4. Statsite receives and aggregates data being streamed using StatsD protocol from the load generators.
5. The PostgreSQL database stores data that is output from Statsite.
6. Grafana pulls data from the database and displays it in near real-time using a custom dashboard specifically designed for the visibility of HTTP and WebSockets metrics.

## 7. Building Edamame

In building Edamame our goal was to provide a tool that met all the specifications in [4. Load testing for collaboration apps](#4-load-testing-for-collaboration-apps). In brief, these were:

- Generating HTTP and WebSocket traffic
- Scaling up to 200k concurrent users
- Collecting and displaying data in near real-time

### a. Generating HTTP and WebSocket traffic

#### i. Choosing a load testing tool

There are many open-source tools for load testing we can build upon to ensure Edamame load tests generate both HTTP and WebSocket traffic. There are a number of factors that should be considered when selecting one, including performance, usability, and level of WebSocket support.

Performance considerations include things like requests per second and memory usage. Requests per second (or RPS) measures how much traffic a load testing tool is generating. Higher RPS means a more performant load generator, as it represents CPU efficiency; a higher RPS means less CPU is utilized per request. Memory usage is also a concern when trying to determine how scalable a load testing tool is, as large numbers of virtual users can be very demanding on RAM. Because Edamame needs to support such a high number of virtual users, we need a tool that requires a minimal amount of RAM per VU.

Ease of use is also an important consideration. For example, how does the user define the tests themselves? Using a scriptable tool allows developers to write detailed and flexible scenarios that virtual users will perform. Depending on the tool, these can be defined via either a general purpose programming language or a DSL. Non-scriptable tools do not provide this kind of customization and flexibility, however.

Finally, the level of support for WebSockets varies from tool to tool. Some tools feature native support for WebSockets, others require third-party plugins, and some do not enable virtual users that simulate WebSocket clients at all.

| Tool                                | wrk      | Gatling     | Artillery   | K6          | JMeter         | Locust         |
|-------------------------------------|----------|-------------|-------------|-------------|----------------|----------------|
| Written in                          | C        | Scala       | NodeJS      | Go          | Java           | Python         |
| Scriptable                          | Yes: Lua | Yes: Scala  | Yes: JS     | Yes: JS     | Limited: XML   | Yes: Python    |
| Managed distributed load generation | No       | No          | Limited     | No          | No             | No             |
| Max requests per second (RPS)       |    54100 |        4700 |         321 |       11300 |           7000 |           2900 |
| Mem Usage per 1VU MB*               |     0.25 |       11.85 |        6.31 |        2.22 |          20.17 |           7.16 |
| WS Support                          | No       | Yes: Native | Yes: Native | Yes: Native | Yes: 3rd party | Yes: 3rd party |

Edamame utilizes and extends k6 for it's load testing framework. We chose k6 because it's one of the most lightweight load-testing tools in terms of how much memory is required per VU which makes it highly scalable. Furthermore, users can provide test scripts written in JavaScript, which is a well-known general-purpose programming language. It has native support for WebSockets, so it can be used to test both HTTP and WebSocket servers.

#### ii. Providing additional WebSocket metrics

While k6 provides many benefits, the default metrics for WebSockets have limitations in that they do not tell the full story of how the targeted WebSocket server is performing. For example, `ws_session_duration` is determined by the user's test script and does not have a high correlation with WebSocket server performance.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️Show where the custom extension goes and how the binary is compiled</p>
</div>

Due to the extensibility of k6, we were able to build a custom extension that tracks five additional metrics. This enables Edamame to provide better visibility into WebSocket performance.

| Metric | Description |
|--------|-------------|
| `ws_current_connections`| The current number of active WebSocket connections. This is important because the k6 default metrics only provide the total number of connections, rather than how many connections are being persisted at any given time. |
| `ws_failed_handshakes`| The number of WebSocket connections that could not be established. An increase of these failures could indicate performance issues with the target system.|
| `ws_abnormal_closure_error`| The number of connections that are dropped, measured by counting the number of 1006 abnormal closure error messages.|
| `ws_msgs_bytes_sent`| The total number of bytes sent in WebSocket messages. As the size of messages can vary widely, this provides additional context to the default k6 `ws_msgs_sent` metric.|
| `ws_msgs_bytes_received`| The total number of bytes received in WebSocket messages.|

### b. Scaling to 200K concurrent users

#### i. Choosing a container orchestration tool

One of the easiest ways to move to a distributed architecture is to leverage containers. Containers allow us to duplicate applications along with their environment and dependencies for efficient deployment to multiple hosts. Deploying services with containers requires some kind of container orchestration tool. This enables us to deploy services, distribute the load, and tear down components as needed to facilitate the sometimes complex workflows of load testing.

Two of the major offerings for container orchestration in the AWS ecosystem are ECS (Elastic Container Services) and EKS (Elastic Kubernetes Services). Edamame deploys to EKS to take advantage of Kubernetes Secrets and ConfigMaps. These components allow us to specify potentially sensitive values like authentication credentials and environment variables and share them easily across Deployments. For example, multiple components in our architecture need access to the database; we can share credentials to enable this easily and securely by referencing a Kubernetes Secret in our Deployment configuration files for these components.

Kubernetes Services provide a permanent IP address to pods that persist across pod life cycles. This facilitates communication across nodes between different components of Edamame. Services are meant to act like sidecars to a pod so that they are not linked to the lifecycle of the pod. This makes our intra-network communication more resilient.

The main benefit of EKS is that it enables Edamame to manage the complex synchronization of load generator pods in an efficient way.

#### ii. Load generator synchronization

The Kubernetes operator pattern allows Edamame to synchronize and manage distributed test runners over the duration of the load test. In Kubernetes, Operators are meant to extend the functionality of the API by providing domain-specific knowledge in the form of custom objects and processes.

By default, [Kubernetes primitives are not meant to manage state](https://github.com/cncf/tag-app-delivery/blob/eece8f7307f2970f46f100f51932db106db46968/operator-wg/whitepaper/Operator-WhitePaper_v1-0.md). Because load tests must be synchronized, there is an inherent element of state built into the deployment of the runner pods; the status of all the runners must be known before a single runner can begin execution. We can use an Operator to solve this problem of state management.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️Zoomed in on the depiction of the load generator node group + k6 operator.</p>
</div>

K6 has provided us with just such an Operator, it contains the domain-specific knowledge necessary to manage the complex workflows of running a distributed k6 load test. When the user provides a test script, Edamame creates a ConfigMap with the desired test script. Edamame then applies a custom resource to the Operator that specifies both the test script that should be run and properties that determine how that test should be run (i.e. how many separate runners should be created).

Once it receives these parameters, the Operator communicates with the Control Plane API to schedule three components:

- The initializer performs error handling for the test. It uses the Operator's domain-specific knowledge to ensure that everything is configured in a way that's best for k6 load test (for example, it checks the validity of the test script).
- The starter is responsible for starting the execution of the test simultaneously in all runner pods.
- The runner pods contain the custom k6 binary along with the test script, and are responsible for generating the load and running the test.

The Operator then continuously polls the runner pods for readiness, and when they are all ready, sends a signal to the starter pod to start the test.

#### iii. Managing compute resources

Though the k6 operator takes care of generating the necessary number of pods, Edamame still needs to configure the compute resources used to run those pods. This helps us ensure the pods are running efficiently. To do so, the cluster has a designated node group for load generator pods that start at zero and scale up each time a test is run, which keeps AWS charges to a minimum.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️Can have an animation here that shows node group scaling up and down, potentially with enough detail to show what affinity and anti-affinity rules are doing as well.</p>
</div>

When Edamame runs a load test, properties such as Affinity/Anti-Affinity and Taints/Tolerations are used to ensure that each runner is scheduled on a single node within the designated node group. Affinity rules are Kubernetes configuration values that can be used to ensure pods running specific processes (i.e. our load generator pods) are being scheduled on the ideal node for those processes. Anti-Affinity rules prevent the same kind of pod from being placed on the same node. Taints and Tolerations ensure pods are *not* scheduled on the wrong kind of node (they allow a node to "repel" a certain kind of pod). Ensuring that a single node only hosts one runner pod allows us to maximize the computing resources of each node within the specialized node group.

The node group is specially configured to contain nodes that maximize the efficiency of the load generators. [K6 benchmarks](https://github.com/grafana/k6-benchmarks/tree/master/results/v0.42.0) indicate that up to 60k virtual users can be supported by a single `m5.4xlarge` node. That being said, how test scripts are written can radically affect how much memory a single virtual user requires. The [official k6 recommendation](https://k6.io/docs/testing-guides/running-large-tests/) is to run no more than 30-40k virtual users per node. To be even safer, Edamame has a default value of 20k virtual users per node, but users can change this value to suit the needs of their specific tests.

To further maximize compute resources, changes are made to the kernel parameters for the specialized nodes. These include `sysctl` commands like extending the range of ports that can be used for outgoing connections, which increases the maximum requests per second. As making these adjustments requires low-level system access, Edamame deploys using EC2 instances with EKS rather than a serverless offering like Fargate.

### c. Collecting and displaying data in near real-time

While k6 was an ideal choice for load testing tool in many ways for Edamame, it does have one significant trade-off: it generates a huge amount of data. For example, running a test script with 100k virtual users, in which a VU sends an HTTP request every six seconds and a WebSocket ping every second results in a data output consisting of about 1 million pieces of data per second.

| VUs  | pieces of data output / sec |
|------|-----------------------------|
| 1k   | ~ 10k  |
| 10k  | ~ 100k |
| 100k | ~ 1 M  |

This magnitude of data output makes it impractical to write data directly to a database. For example, we tested writing directly to TimescaleDB (a performant time series database) and we found it handled only about 100k writes per second. In order to avoid highly complex components such as a sharded or [distributed database](https://www.timescale.com/blog/building-a-distributed-time-series-database-on-postgresql/), Edamame implements a stream processing data pipeline.

#### i. Stream processing with Statsite and the StatsD protocol

To mitigate the amount of data being output, Edamame outputs load test data from generator pods using the StatsD protocol. StatsD is a lightweight, fast, text-based protocol whose aim is to aggregate data efficiently in a single location. Unifying load test data in a single location on pre-determined time windows (known as "flush intervals") enables more accurate percentile aggregation before sending data to the database for storage.

StatsD consists of three metric types:

- **Counters** (`c`): represent values that are summed, such as the total amount of requests sent.
- **Gauges** (`g`): represent the "latest" value, such as the number of currently connected virtual users
- **Timers** (`ms`): track how long something takes. These values are aggregated into trends that can be broken out into percentiles, such as HTTP response time. Using StatsD enables us to specify which percentile we want to report (i.e. 50th, 95th, 99th).

```txt title="StatsD protocol"
k6.http_req_failed:1|c
k6.ws_current_connections:14.000000|g
k6.http_req_duration:132.231000|ms
```

The StatsD output data is sent to a StatsD server. The [original StatsD server was developed by Etsy](https://www.etsy.com/codeascraft/measure-anything-measure-everything) and utilized NodeJS. It has a number of limitations, notably [it only handles an ingestion rate of 10k/sec](https://news.ycombinator.com/item?id=5958381).

Statsite is a more performant StatsD server that's written in C. It uses a single core with an event loop to handle much higher numbers of data than the original StatsD server. It's also highly efficient when it comes to data aggregation. For example, counter values are aggregated as they are received. Trends are aggregated into the specified percentiles using the [Count-min sketch](https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch), a probabilistic data structure that is much faster than sorting timer data points and selecting the needed percentile. Probabilistic data structures like this allow us to "calculate a good approximation of percentiles at minimal CPU and memory cost" (*Designing Data-Intensive Applications* by Martin Kleppman).

Another benefit to Statsite is that it supports multiple "sinks", or outputs. This makes it flexible in terms of database integration, due to the fact any executable or script can be used as a sink. Overall, using Statsite allowed Edamame to significantly minimize the amount of database writes per second. For example, if the load test tracks 20 metrics, the result is 20 writes per five-second flush interval.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️Zoomed in image of the actual data pipeline portion</p>
</div>

While k6 has an output extension that enabled us to output data using StatsD, it had some issues. Namely, gauge metrics from separate load generator pods were overwriting each other (rather than being summed), so we were not receiving accurate test data. Edamame fixes this problem by providing a custom output extension that allows for gauges from separate load generators to be aggregated accurately.

This output extension is written in Go (to integrate easily with the k6 custom binary). It adds the ability to pass a namespace to gauge metrics, to ensure that data from separate pods are treated as separate measurements. To use this capability, we configured the k6 custom resource to include a namespace value as an environment variable. This allows us to "tag" and sum our gauge values in a more accurate way once they are processed.

Another hurdle was the fact that Statsite does not provide an out-of-the-box extension that sends metrics to Postgres (our chosen DB, see below). In order to facilitate this, Edamame includes a custom extension to Statsite written in Node. This aggregates the gauges that have been namespaced to preserve data integrity by summing them, converts data to SQL, and makes the necessary writes to store data. The writes are performed on a 5s flush interval, which we found to provide the best balance of smoothing noise and providing near real-time data analysis.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️Image depicting difference between UDP & TCP (for example, showing 3 way handshake)</p>
</div>

One of the things that makes Statsite so efficient is that it utilizes UDP for data transport. UDP, being a connectionless protocol, provides lower latency than transport over TCP. While this enables us to provide near real-time data, it also has its drawbacks, in that UDP lacks the reliability features of TCP. In order to ensure Statsite is reliable and keep packet loss at a minimum, Edamame uses a node that is performance tuned to allow high UDP traffic.

Finally, as the functionality of Statsite relies on aggregating data within a single location, it can represent a single point of failure for the system. By deploying Statsite on EKS, Edamame leverages Kubernetes' self-healing properties to mitigate this issue. If Statsite goes down, the Kubernetes control plane replaces it right away. When testing this eventuality, Edamame lost only a single interval of data, since Statsite was running before the next flush interval occurred. While some small amount of data might be lost, after testing it became clear that this is minimized to an acceptable range of statistical anomaly.

#### ii. Storing data in PostgreSQL

Edamame persists data using a PostgreSQL database. Since the data aggregation pipeline was able to minimize the amount of writes per second so significantly, there was no real reasons to have a more performant database. Moreover, PostgreSQL integrates well with Grafana, and due to the utilization of a well known query language like SQL, it makes it easy for the user to set up any custom dashboard or queries necessary to visualize data.

Since the rest of Edamame's architecture is deployed to EKS, it made sense to take advantage of Kubernetes internal Service components and deploy PostgreSQL to the cluster as well. This makes it simple for all components to communicate with each other (they are within the same VPS, and Kubernetes provides persistent IPs for each). This also means the user does not have to pay for a managed database solution, which can be costly. The drawback with this approach is that Kubernetes pods are ephemeral; containers do not persist data across their lifecycle without some additional components to facilitate this.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️Zoomed in image of the DB with connection to EBS volume.</p>
</div>

Edamame utilizes AWS Elastic Block Store (EBS) to mount Persistent Volumes with a PostgreSQL instance inside the EKS cluster. The EBS volume is a separate entity outside the EKS cluster, so data stored there is not ephemeral or tied to pod life cycles. The PostgreSQL is deployed as a StatefulSet, and uses a Persistent Volume Claim to requisition an EBS Volume when it is applied to the cluster. The identity of this volume is persisted across pod lifecycles to ensure that that if the pod ever goes down, its replacement can connect to the same Persistent Volume and no data is lost.

There are a couple of benefits to this approach. EBS storage costs are minimal when compared with managed database solutions. Moreover, EBS integrates well with EKS, where the rest of the application components are deployed, and facilitates fluid communication between services.

That being said, there are some small trade-offs involved. It adds a bit of complexity to the cluster initialization, as Edamame now adds some pre-configured roles and functionality in the form of the Amazon EBS CSI driver. Furthermore, data is not persisted beyond the cluster lifecycle.

#### iii. Visualizing results in near real-time

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="400"/>
  <p>🖼️Zoomed in image of Grafana connecting to DB and our UI.</p>
</div>

Edamame uses Grafana to visualize data for the user. This is deployed into the EKS cluster, which allows it to easily connect to other components of the architecture. Grafana is configured to ensure it starts up with a default connection to the PostgreSQL database. The user can access Grafana via secure port forwarding, to ensure privacy and keep potentially sensitive performance data safe.

Grafana's main benefit is the ability to pre-configure custom dashboards. Edamame provides a default dashboard specifically developed for showing WebSocket metrics in conjunction with HTTP. Both the dashboard and its metadata are defined using a Kubernetes ConfigMap. A JSON file is then used to configure the dashboard to our specific use case, for example, by declaring how to display Edamame's WebSocket specific metrics.

Since Grafana dashboards are defined using SQL queries, the user can easily customize the default dashboard or create new dashboards of their own. To make sure these dashboard configuration values persist, Grafana is also assigned an EBS volume. Since Edamame does not have any constraints on data storage duration, users can view data visualizations for previously run tests, and notice any larger patterns that may occur. This gives deep insight into how target systems are responding to load.

<div class="text--center" >
  <img src="https://user-images.githubusercontent.com/76174119/228081027-62238425-b004-482c-b3c7-a11c97411b50.png" alt="Example banner" width="700"/>
</div>

<div class="text--center" >
  <img src="https://user-images.githubusercontent.com/76174119/228081016-e669dc4d-d1ce-4483-8924-b72ab8c3d1cb.png" alt="Example banner" width="700"/>
</div>

## 8. Future plans

Edamame provides a good framework for performing distributed load tests that target both HTTP and WebSockets. It supports tests of up to 200k virtual users, sufficiently tests complex systems with multiple protocols, and uses a performant data pipeline to aggregate and visualize data in near real-time. That being said, there are a number of improvements and additional features that could be added in the future.

### a. Improving scalability

Edamame's data pipeline relies on a single instance of a Statsite server in order to aggregate test metrics into percentiles accurately. The ability to horizontally scale this component is limited by the complications that aggregating percentiles brings. This means that we cannot currently scale beyond its maximum ingestion rate of 2 million data points per second. This is the main limiting factor when it comes to how many virtual users Edamame can support.

To increase the number of virtual users Edamame can support given its current architecture, we can further customize the k6 StatsD output extension. Currently, it does not consolidate metrics like counters, which can be easily aggregated without data loss. Summing these data points into a single piece of data would mitigate the amount of data being output by the load generators, and increase the number of virtual users that can be generated before reaching Statsite's maximum ingestion rate.

To make Edamame able to handle even larger load tests, we can make the data pipeline more horizontally scalable. This would involve re-working the architecture, by switching to an approach where data is aggregated at each load generator. Using [t-digest](https://redis.com/blog/t-digest-in-redis-stack/), a probabilistic data structure, enables us to aggregate percentiles in more than one location: once at the node level and then again at the server level. The ability to re-aggregate would immediately cut down on the amount of data being sent, allowing Edamame to scale to even higher numbers of virtual users.

Currently, there is no support for t-digest in the k6 ecosystem, nor is there an available t-digest aggregation server, so this approach would involve developing a number of custom components from scratch.

### b. Node observability

One consideration when adding the ability for users to set a custom number of virtual users per load generator pod is how the user understands whether or not they are overloading the pod. To give insight into this question, Edamame can increase the observability of load test performance. Currently, visibility into the health of load generator nodes can be ascertained by installing a [Kubernetes Dashboard](https://github.com/kubernetes/dashboard).

Rather than relying on additional third-party resources, in the future Edamame should provide metrics like CPU consumption, RAM consumption, and bandwidth for load generator nodes. This would allow the user to tailor how load generating infrastructure is set up in a way that's more specific to the tests they are running.

### c. Data import and export

Currently all AWS resources are deleted with the command `edamame teardown`, including EBS volumes. This means that data is *not* persisted beyond the lifecycle of the EKS cluster that supports Edamame's architecture. We'd like to give users a way to export data when removing AWS resources, to decrease vendor lock-in.

As Edamame already contains a separate backend API for the database in the form of an Express app, components are already in place to provide this service. To perform the export, one approach would be to create an SQL file representing all the data in the database and store this in an S3 bucket. This file could then be used to load the data into another database of the user's choosing.

This approach also enabled Edamame to check for the presence of such a file during the initialization process, and use it to populate the database with the previous cluster's data. This would ensure that data is persisted across cluster lifecycles, should the user ever need to take down their EKS infrastructure for any reason.

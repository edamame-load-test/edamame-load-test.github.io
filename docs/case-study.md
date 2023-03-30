# Case Study

## 1. Abstract

Edamame is a distributed load testing framework for testing messaging applications and collaboration tools that use both HTTP and WebSocket services. It is built for medium-sized companies that need to support up to 200k concurrently connected users. Edamame collects client-side metrics and displays data in near real-time, which provides developers deep insight into their systems. The ability to dynamically start and stop tests makes Edamame safe to run in either a staging or production environment.

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

Another consideration is how long the developer has to wait until they see data. A summary presupposes that there is no more data to process; the test is complete. For a short test (say 30 secs), this may not be an issue, however, load tests can be very long (say 3 hours). In this case, developers have to wait until the end of the test to view the results. Instead of waiting through the duration of the test, load testers can output granular data in near real time.

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

That being said, we may still want to run load tests in a production environment because this yields the most accurate results. Moreover, some companies (such as fast-growth startups) may not have the time or financial resources to implement a full duplicate staging environment. Finally, there might be overlapping resources between both staging and production. In this case, staging environments are not perfectly isolated, and care needs to be taken to prevent consequences to real end users.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
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

- **Messaging**: Slack, Discord, or Mattermost allow users to join rooms or channels and talk to each other in real-time.
- **Whiteboarding**: Miro and Whimsical give teams a visual platform to collaborate on brainstorming aids and graphic deliverables like mind maps or flow charts.
- **Productivity**: Coda is a versatile tool that enables teams to perform project management by collaborating on a series of documents, tables, and tasks.

All of these tools benefit from [low-latency data transfer](https://ably.com/blog/what-it-takes-to-build-a-realtime-chat-or-messaging-app) (~100ms) and the ability for a server to push data directly to a client without relying on a request. To achieve these goals, the above collaboration apps rely on WebSockets.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️Depiction of the difference between HTTP and WS</p>
</div>

**WebSocket** is a protocol that operates over HTTP and uses the underlying TCP layer to create a persistent connection between client and server. It allows for bi-directional communication between the client and server, unlike HTTP, in which a client must first initiate communication with a server by issuing a request. This persistent connection provided by WebSockets allows the server to stream events back to a client in real time.

On the client side, a WebSocket object is required in the browser to facilitate this persistent connection. The WebSocket object uses event-based asynchronous callbacks to handle incoming messages from the server, and can also send messages to the server. WebSocket messages, unlike HTTP, don't require a response.

On the server side, to connect with clients, a separate WebSockets server must be added to the architecture. Now we have traffic existing in two separate places; the WS server and the HTTP server.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
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

For the aforementioned apps, the message being published can take the form of either an HTTP request or WebSocket message from the client. To enable real-time communication, messages are sent back up to subscribed collaborators vis WebSocket. Depending on how large the channel is, one published message can lead to a sizeable fan-out.

For example, if you send a message to a Slack channel with 1k subscribers, the single POST request that sends the message turns into 1k WebSocket messages being emitted.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️Fanout</p>
</div>

<!-- markdownlint-disable MD024 -->
### c. Summary

Managing a real-time collaboration app poses a unique set of circumstances that developers must take into consideration. WebSocket servers and clients behave differently than their HTTP counterparts, and so additional scenarios like WebSocket performance, thundering herds, and fan-out messaging must be accounted for. To ensure this, developers perform load tests that accurately mimic these kinds of behaviors.

## 4. Load testing for collaboration apps

Due to the rise of remote work, applications in this space can grow very quickly. For example, [Miro grew from 12k to 100k concurrently connected users](https://medium.com/miro-engineering/reliable-load-testing-with-regards-to-unexpected-nuances-6f38c82196a5) in the space of a year. Fast growth requires scalability, which can compound the challenges listed above. To understand how such a system responds to stress and see if it remains operational amidst an influx of connections, load tests should have a certain set of characteristics to be effective.

- It needs to ensure that all architecture components supporting both HTTP and WebSocket are sufficiently tested. This means that the virtual users should be able to mimic both an HTTP and WebSocket client.
- It should be able to generate up to 200k virtual users per test to support the needs of medium-to-large collaboration apps.
- It should be able to collect and display granular data pertaining to both HTTP and WebSocket concerns. To ensure the safety of target systems in an agnostic environment, this data should be emitted in near real-time.

### a. Generating HTTP and WebSocket traffic

Typically, the HTTP server and WS server need to be tested in tandem to get an accurate picture of how the system responds to load. For applications that only support HTTP endpoints, an HTTP load tester is sufficient. However, collaboration apps cannot rely on HTTP requests alone for load testing, as client traffic is divided between two different protocols. HTTP-focused load tests do not cover all components of a collaborative application's architecture.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️An image that shows how a traditional API blaster only tests part of the system / re-working of the first koi pond diagram. </p>
</div>

In an HTTP load test, requests are sent to the HTTP server. This causes data to be sent to the WebSocket server in response, so that the messages received can be propagated to subscribed users. However, if the virtual users in the load test do not maintain persistent WebSocket connections, the WebSocket server never has to emit any messages (there are no active subscribers). This means that a critical part of the architecture never has to sustain any load.

Due to fan-out messaging, the number of WebSocket messages that must be sent (and therefore, the amount of load the WebSocket server must sustain) can be orders of magnitude different from the amount of HTTP requests being received. It is of vital importance that the virtual users in the load test accurately simulate the persistently connected WebSocket clients.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️An image that shows how a system can be tested holistically, with persistently connected clients to show how it </p>
</div>

This limits the choice of load testing tools to those that support both HTTP and WebSockets. The load tester should also collect meaningful metrics pertaining to both protocols, which may or may not be included.

### b. Scaling to 200K concurrent users

During their Series A stage, Miro grew from 12k to 100k currently connected users in the space of a year. Typically, a company in the Series A stage wants to see growth like this; their goal is to be rapidly and predictably scaling, and to ensure that their supporting infrastructure is scaling in tandem with the number of users.

While the actual numbers of daily active users varies from company to company, our research shows that late stage Series A companies are typically around the 100k range. An effective load tester for a company in this phase of growth should allow tests of up to 100% this number, which we estimate to be about 200k virtual users.

Running load tests that generate 200k virtual users necessitates a distributed architecture, due to the amount of compute resources required. In most cases, this means moving to the cloud. This requires a number of different cloud-based components, meaning we need a system to manage the required infrastructure.

<div class="text--center" >
  <img src={Placeholder} alt="Example banner" width="200"/>
  <p> 🖼️Visualizing why syncing nodes is important</p>
</div>

One major concern with distributed load tests is how to synchronize the load generators. Load tests often have a predefined pattern for how the number of virtual users is ramped up and down over the duration of the test. Different patterns test how systems respond to different scenarios.

For example, a load test may ramp up from zero to 100k VUs over the course of a five minute interval, and then immediately start ramping back down to zero VUs over the next five minutes. If this test is spread across five nodes, then all five nodes must start the test at exactly the same time. Otherwise, the test will never reach 100k VUs at its peak.

Therefore, we need a way to synchronize load generator nodes to ensure they all start ramping up the load at the same time, and stay in line with each other to match the predefined pattern of load.

Providing a way to manage load generator nodes also gives the load tester the ability to stop the test, in case critical aspects of a production environment are threatened by the additional load.

### c. Collecting and displaying data in near real-time

Fast-growth companies may not have time to set up isolated staging environments to perform tests (growth could happen overnight). A load testing tool can take the dangers associated with this into consideration by providing near real-time results. If systems begin to show signs of degrading, the test can be stopped immediately.

To facilitate near real-time visualization of data, the load tester requires a stream processing approach as opposed to batch processing. Batch processing presupposes the data has a defined start and finish, meaning that batch processing delivers results like end-of-test summaries. This is a time consuming approach that does not suit the time-sensitive nature of load test data for tests targeting an agnostic environment.

<div class="text--center" >
  <img src="https://hazelcast.com/wp-content/uploads/2021/12/diagram-stream-processing.png" alt="Example banner" width="400"/>
  <p> 🖼️Graphic showing simple stream processing system</p>
</div>

Stream processing, on the other hand, assumes data is unbound and arrives continually over time. To derive analytics like percentiles from the data stream, the system splits data up into time intervals. All the data points that fit into one of these "windows" is aggregated and sent to storage. This comes with challenges of its own.

More virtual users means more data. The amount of data depends on a variety of factors, including the type of load test, which load testing tool is used to conduct the test, which metrics are being collected, and how frequently they are being collected. For example, a test in which virtual users are making HTTP requests each second would result in a higher amount of data than a test in which a request is made every ten seconds. Stream processing data in vast quantities could be difficult.

Finally, we need a storage method and an effective visualization tool that can show all this data in an understandable way. The visualization tool can then continually pull from storage as data is added, allowing developers to see analyzed data as the test executes.

## 5. Existing solutions

## 6. Edamame architecture

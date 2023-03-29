"use strict";(self.webpackChunkedamame_load_test_github_io=self.webpackChunkedamame_load_test_github_io||[]).push([[120],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>m});var n=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):s(s({},t),e)),a},d=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),p=c(a),h=o,m=p["".concat(l,".").concat(h)]||p[h]||u[h]||i;return a?n.createElement(m,s(s({ref:t},d),{},{components:a})):n.createElement(m,s({ref:t},d))}));function m(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=a.length,s=new Array(i);s[0]=h;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r[p]="string"==typeof e?e:o,s[1]=r;for(var c=2;c<i;c++)s[c]=a[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},2735:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var n=a(7462),o=(a(7294),a(3905));const i=a.p+"assets/images/logo-light-green-63d3612d3b6478f963f4f702cf93876b.png",s={},r="Case Study",l={unversionedId:"case-study",id:"case-study",title:"Case Study",description:"1. Abstract",source:"@site/docs/case-study.md",sourceDirName:".",slug:"/case-study",permalink:"/docs/case-study",draft:!1,tags:[],version:"current",frontMatter:{}},c={},d=[{value:"1. Abstract",id:"1-abstract",level:2},{value:"2. Background: load testing",id:"2-background-load-testing",level:2},{value:"a. What is load testing?",id:"a-what-is-load-testing",level:3},{value:"b. Considerations when building a load tester",id:"b-considerations-when-building-a-load-tester",level:3},{value:"i. Client-side metrics",id:"i-client-side-metrics",level:4},{value:"ii. Scale",id:"ii-scale",level:4},{value:"iii. Testing environment",id:"iii-testing-environment",level:4},{value:"c. Summary",id:"c-summary",level:3},{value:"3. Background: Collaboration apps",id:"3-background-collaboration-apps",level:2},{value:"a. What are collaboration apps?",id:"a-what-are-collaboration-apps",level:3},{value:"b. Challenges of developing a collaboration app",id:"b-challenges-of-developing-a-collaboration-app",level:3},{value:"i. WebSocket performance",id:"i-websocket-performance",level:4},{value:"ii. Supporting separate protocols",id:"ii-supporting-separate-protocols",level:4},{value:"iii. &quot;Fan out&quot;",id:"iii-fan-out",level:4},{value:"c. The need to load test collaboration apps",id:"c-the-need-to-load-test-collaboration-apps",level:3},{value:"4.",id:"4",level:2}],p={toc:d},u="wrapper";function h(e){let{components:t,...a}=e;return(0,o.kt)(u,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"case-study"},"Case Study"),(0,o.kt)("h2",{id:"1-abstract"},"1. Abstract"),(0,o.kt)("p",null,"Edamame is a distributed load testing framework for testing messaging applications and collaboration tools that use both HTTP and WebSocket services. It is built for medium-sized companies that need to support up to 200k concurrently connected users. Edamame collects and displays client-side metrics in real-time, which provides developers deep insight into their systems. The provided ability to dynamically start and stop tests makes Edamame safe to run in either a staging or production environment."),(0,o.kt)("p",null,"Creating a load tester with these features comes with a unique set of challenges. First, the load tester needs to test the target system with multiple protocols in tandem and ensure that the concerns of different protocols are thoroughly addressed. Second, the kind of traffic medium-sized companies need to simulate requires a distributed architecture, which adds significant complexity to the tool. Third, providing client-side metrics in real-time means systems need to be in place to collect, process, store, and visualize these metrics in a performant way."),(0,o.kt)("p",null,"Edamame provided an open-source, easy-to-use, plug-and-play solution to the above challenges."),(0,o.kt)("h2",{id:"2-background-load-testing"},"2. Background: load testing"),(0,o.kt)("h3",{id:"a-what-is-load-testing"},"a. What is load testing?"),(0,o.kt)("p",null,"What happens when a web application gets more traffic than anticipated? Can the underlying infrastructure handle the traffic? Does the application slow down? Or\u2014worst case scenario\u2014does the application crash?"),(0,o.kt)("div",{class:"text--center"},(0,o.kt)("img",{src:i,alt:"Example banner",width:"200"}),(0,o.kt)("p",null," \ud83d\uddbc\ufe0f Tweet or screenshot of Ticketmaster going down")),(0,o.kt)("p",null,"Overwhelming traffic is a frustrating reality for many internet users. Whether it's a popular online sale event like Black Friday or a highly anticipated concert, the surge of visitors to a website can cause it to slow down or even crash. Ticketmaster found out just how bad things could get when 14 million users trying to buy Taylor Swift tickets ",(0,o.kt)("a",{parentName:"p",href:"https://www.businessinsider.com/ticketmaster-14-million-people-tried-buy-taylor-swift-presale-tickets-2022-11"},"crashed their site"),"."),(0,o.kt)("p",null,"Developers, to ensure their application can handle this kind of situation, re-create high-traffic scenarios by performing load tests. ",(0,o.kt)("strong",{parentName:"p"},"Load testing"),' is the process of simulating user load on a system and measuring how that system responds. In a load test, a set number of programmatically generated "virtual users" are automated to interact with the system in pre-defined ways. This process helps developers identify performance bottlenecks within a system and provides assurance that the system can maintain expected standards, even under heavy strain.'),(0,o.kt)("div",{class:"text--center"},(0,o.kt)("img",{src:i,alt:"Example banner",width:"200"}),(0,o.kt)("p",null," \ud83d\uddbc\ufe0fDepiction of a simple load test")),(0,o.kt)("p",null,"For a web application, one way to perform a basic load test is to use an HTTP benchmarking tool, like ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/wg/wrk"},"wg/wrk"),". This involves sending frequent HTTP requests to a target endpoint in order to simulate bursty traffic, and seeing how that system responds."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-txt",metastring:'title="wrk command"',title:'"wrk','command"':!0},"wrk --connections=400 --duration=30s http://127.0.0.1:8080/index.html\n")),(0,o.kt)("p",null,"Despite the simplicity of this approach, load testing can have many levels of complexity. Depending on the developer's requirements, this can take many forms."),(0,o.kt)("h3",{id:"b-considerations-when-building-a-load-tester"},"b. Considerations when building a load tester"),(0,o.kt)("h4",{id:"i-client-side-metrics"},"i. Client-side metrics"),(0,o.kt)("p",null,"The first thing we need to consider is what metrics are we collecting."),(0,o.kt)("p",null,"Some load tests are more focused on server-side metrics, which include measurements like CPU usage and memory consumption for the target system. This informs a developer on the health of their system's server. In cases where server-side metrics are primary, these are often obtained by system monitoring tools outside the load tester's purview."),(0,o.kt)("p",null,"A developer also needs to understand how the end user's experience may change under heavy load, which is where client-side metrics come in. These provide important insight by measuring things like HTTP response time, which tells us the overall latency of the target system. Other important measurements include the number of failed HTTP requests. An increase in numbers for either of these could indicate that the system is starting to regress."),(0,o.kt)("p",null,"Next, we must determine how these measurements are analyzed. One option is to view a tabular summary. This makes results easy to parse and gives a high-level overview of how the system responded.  "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-txt",metastring:'title="wrk summary"',title:'"wrk','summary"':!0},"Running 30s test @ http://127.0.0.1:8080/index.html\n12 threads and 400 connections\nThread Stats   Avg      Stdev     Max   +/- Stdev\n  Latency   635.91us    0.89ms  12.92ms   93.69%\n  Req/Sec    56.20k     8.07k   62.00k    86.54%\n22464657 requests in 30.00s, 17.76GB read\nRequests/sec: 748868.53\nTransfer/sec:    606.33MB\n")),(0,o.kt)("p",null,"However, there are drawbacks associated with this approach, namely, it lacks granularity. The alternative is to plot individual data points along a time axis. This way, data is detailed enough to understand exactly when problems start to arise and we can also analyze causal relationships between different data points."),(0,o.kt)("p",null,"Another consideration is how long the developer has to wait until they see data. A summary presupposes that there is no more data to process; the test is complete. For a short test (say 30 secs), this may not be an issue, however, load tests can be very long (say 3 hours). In this case, developers have to wait until the end of the test to view the results. Instead of waiting through the duration of the test, load testers can output granular metrics in real time."),(0,o.kt)("p",null,"Real-time data output can be very useful because it allows developers to respond to developments in test results as they occur. For example, being able to stop a test once a certain threshold is reached. However, real-time processing is an engineering challenge, and may not be worth the additional complexity involved based on developer needs."),(0,o.kt)("h4",{id:"ii-scale"},"ii. Scale"),(0,o.kt)("p",null,"Running load tests locally is limiting. It's difficult to simulate thousands of separate users on a single host. Even using a load testing tool with a fairly low memory footprint, a 2-core CPU host with 8GB of RAM can generate a maximum of about ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/grafana/k6-benchmarks/tree/master/results/v0.42.0#ec2-m5large"},"6k virtual users"),"."),(0,o.kt)("p",null,"There are three main limiting factors to local load testing:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CPU"),": The CPU is heavily utilized in a load test. If it is not powerful enough, it can become a bottleneck, slowing down the test and limiting the number of virtual users that can be simulated."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Memory"),": Load tests running on a single host cannot generate more virtual users than the RAM will support. Load tests often use 1 - 20 MB per virtual user, so even with only 1000 VUs, you might need up to 20GB of RAM to run that load test."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Network"),": If the network throughput is too low, the load test may not accurately simulate the real-world conditions of user traffic, resulting in inaccurate or unreliable test results. For instance, in our example host above the network bandwidth is ",(0,o.kt)("a",{parentName:"li",href:"https://aws.amazon.com/ec2/instance-types/m5/"},"up to 10GB"),".")),(0,o.kt)("div",{class:"text--center"},(0,o.kt)("img",{src:i,alt:"Example banner",width:"200"}),(0,o.kt)("p",null," \ud83d\uddbc\ufe0fDepiction of a distributed load test")),(0,o.kt)("p",null,"If local resources do not allow a developer to reach the desired number of virtual users, then it's necessary to run a distributed load test. In a ",(0,o.kt)("strong",{parentName:"p"},"distributed load test"),', multiple hosts generate load. The hosts which create virtual users and run the test are often known as "load generator nodes" or "test runner nodes". These can be horizontally scaled to support the number of virtual users required.'),(0,o.kt)("h4",{id:"iii-testing-environment"},"iii. Testing environment"),(0,o.kt)("p",null,"Another consideration is which environment we target in our load tests. Developers often use staging environments to mirror production environments. This provides a level of isolation that enables load tests to be conducted without fear of taking down any critical production services."),(0,o.kt)("p",null,"That being said, we may still want to run load tests in a production environment because this yields the most accurate results. Moreover, some companies (such as fast-growth startups) may not have the time or financial resources to implement a full duplicate staging environment. Finally, there might be overlapping resources between both staging and production. In this case, staging environments are not perfectly isolated, and care needs to be taken to prevent consequences to real end users."),(0,o.kt)("div",{class:"text--center"},(0,o.kt)("img",{src:i,alt:"Example banner",width:"200"}),(0,o.kt)("p",null," \ud83d\uddbc\ufe0fDepiction of staging and production potentially having overlapping resources")),(0,o.kt)("p",null,"Therefore if there is a risk to critical parts of the production environment, safeguards need to be put in place to protect the availability of production systems when running a load test."),(0,o.kt)("h3",{id:"c-summary"},"c. Summary"),(0,o.kt)("p",null,"Depending on developer needs, load testing can take many different forms. On the most basic level, we need to consider the data being collected, the required scale of the load test, and the environment being targeted."),(0,o.kt)("p",null,"Depending on an application's capability and complexity, more factors come into play. For example, messaging applications and collaboration tools have specific characteristics that need to be considered when determining what load testing approach should be taken."),(0,o.kt)("p",null,"In the next section, we take a look at how collaboration apps work and how these pose specific challenges that need to be answered by an effective load testing tool."),(0,o.kt)("h2",{id:"3-background-collaboration-apps"},"3. Background: Collaboration apps"),(0,o.kt)("h3",{id:"a-what-are-collaboration-apps"},"a. What are collaboration apps?"),(0,o.kt)("p",null,"Collaboration apps are applications that include some kind of real-time communication aspect, such as chat or collaborative editing. For example, messaging apps like Slack, Discord, or Mattermost which allow users to connect to rooms or channels and talk to each other in real time. Collaborative editing apps, while not quite the same thing, share a number of considerations and implementation details with chat apps. These include services like Miro, Whimsical, and Coda."),(0,o.kt)("p",null,"All of these tools benefit from ",(0,o.kt)("a",{parentName:"p",href:"https://ably.com/blog/what-it-takes-to-build-a-realtime-chat-or-messaging-app"},"low-latency data transfer")," (~100ms) and the ability for a server to push data directly to a client without relying on a request. To achieve these goals, many collaboration apps rely on WebSockets."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"WebSocket")," is a protocol that operates over HTTP and uses the underlying TCP layer to create a persistent connection between client and server. It allows for bi-directional communication between the client and server, unlike HTTP, in which a client must first initiate communication with a server by issuing a request. This persistent connection provided by WebSockets allows the server to stream events back to a client in real-time."),(0,o.kt)("div",{class:"text--center"},(0,o.kt)("img",{src:i,alt:"Example banner",width:"200"}),(0,o.kt)("p",null," \ud83d\uddbc\ufe0fDepiction of the difference between HTTP and WS")),(0,o.kt)("p",null,'To facilitate this persistent connection under the hood, a client-side WebSocket object in the browser is required. This object uses event-based callbacks to react to messages being sent from the server. Because the client object uses an asynchronous event-based model, WebSocket messages are "fire and forget", unlike HTTP, there is no required response.'),(0,o.kt)("p",null,"To connect with clients, a separate WebSockets server must be added to the architecture. Now we have traffic existing in two separate places; the WS server and the HTTP server."),(0,o.kt)("div",{class:"text--center"},(0,o.kt)("img",{src:i,alt:"Example banner",width:"200"}),(0,o.kt)("p",null," \ud83d\uddbc\ufe0fDepiction of more complex system including traffic split over two protocols")),(0,o.kt)("h3",{id:"b-challenges-of-developing-a-collaboration-app"},"b. Challenges of developing a collaboration app"),(0,o.kt)("h4",{id:"i-websocket-performance"},"i. WebSocket performance"),(0,o.kt)("h4",{id:"ii-supporting-separate-protocols"},"ii. Supporting separate protocols"),(0,o.kt)("h4",{id:"iii-fan-out"},'iii. "Fan out"'),(0,o.kt)("h3",{id:"c-the-need-to-load-test-collaboration-apps"},"c. The need to load test collaboration apps"),(0,o.kt)("h2",{id:"4"},"4."))}h.isMDXComponent=!0}}]);
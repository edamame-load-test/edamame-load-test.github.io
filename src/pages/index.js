import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Layout
        title={`Hello from ${siteConfig.title}`}
        description="An open source load-testing framework for collaboration apps"
      >
        <div className="font-sans">
          {/* Section 1 */}
          <div className="bg-gray-800 px-4 text-white antialiased py-8 md:py-24 pb-14 relative font-sans border-solid border-t-1 border-gray-700 border-r-0 border-l-0 border-b-0">
            <img
              className="hidden md:block absolute lg:left-[10%] 2xl:left-[20%] animate-cursor-1"
              src="/img/albert-cursor.svg"
            />
            <img
              className="absolute bottom-[24%] lg:left-[12%] lg:bottom-[15%] 2xl:left-[30%] 2xl:bottom-[20%] animate-cursor-2"
              src="/img/rachel-cursor.svg"
            />
            <img
              className="hidden md:block absolute   right-[12%] lg:top-[20%]  2xl:right-[20%] animate-cursor-3"
              src="/img/luke-cursor.svg"
            />
            <img
              className="absolute right-[6%] md:bottom-[15%] lg:right-[15%] 2xl:right-[35%] 2xl:bottom-[20%] animate-cursor-4"
              src="/img/ginni-cursor.svg"
            />
            <h1 className="leading-[48px] mb-2 text-white font-epilogue text-4xl md:text-5xl tracking-tighter font-medium max-w-3xl mx-auto text-center md:leading-tight">
              An open source load-testing framework for collaboration apps
            </h1>
            <p className="text-xl leading-normal md:text-2xl mx-auto text-center max-w-4xl text-gray-300 mt-1 md:mt-2 md:leading-10">
              You’re one command away from launching a WebSockets load test of{" "}
              <br />{" "}
              <span>
                <span className="text-cyan-300">100K+ virtual users</span> on
                your own AWS infrastructure
                <div className="hidden md:block">
                  <svg
                    class="svg relative left-48 text-left"
                    width="183"
                    height="21"
                    viewBox="0 0 183 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2C2 2 173.648 2 178.591 2C183.534 2 80.2386 12 74.2727 12.4348C68.3068 12.8696 176.375 19.2826 181.489 19.2826"
                      stroke="#5FE6F9"
                      stroke-width="3"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </span>{" "}
            </p>
            <div className="flex gap-2 justify-center mt-8">
              <a
                href="https://youtu.be/JNPoYgS471w"
                className="border border-solid border-gray-400 px-4 text-base sm:text-lg py-3 rounded-full flex gap-2 text-white hover:no-underline hover:text-white hover:border-gray-300 transition"
              >
                <img src="/img/play-button.svg" />
                Watch Video
              </a>
              <a
                href="/case-study"
                className="px-5 text-base sm:text-lg py-3 rounded-full bg-primary hover:bg-primaryLight transition antialiased text-white hover:no-underline hover:text-white"
              >
                Read case study
              </a>
            </div>
          </div>
          {/* Section 2 */}
          <div className="px-2 py-10 md:py-20">
            <p className=" uppercase text-large tracking-wide font-semibold text-gray-600 text-center">
              Supports
            </p>
            <div className="flex gap-2 md:gap-12 justify-center mt-6 flex-col md:flex-row ">
              <div className="flex flex-col justify-start text-center md:text-left gap-2">
                <p className="text-4xl lg:text-5xl font-medium tracking-tight mb-0 lg:mb-2">
                  1M+
                </p>
                <p className="text-lg text-gray-600"> Datapoints per second</p>
                <hr className="m-0 bg-gray-300 md:hidden mb-5"></hr>
              </div>
              <div className="flex flex-col justify-start gap-2 text-center md:text-left">
                <p className="text-4xl lg:text-5xl font-medium tracking-tight mb-0 lg:mb-2">
                  100K+
                </p>
                <p className="text-lg text-gray-600"> Virtual Users</p>
                <hr className="m-0 bg-gray-300 md:hidden mb-5"></hr>
              </div>
              <div className="flex flex-col justify-start gap-2 text-center md:text-left ">
                <p className="text-4xl lg:text-5xl font-medium tracking-tight mb-0 lg:mb-2">
                  WebSocket & HTTP
                </p>
                <p className="text-lg text-gray-600">
                  {" "}
                  Load tests out of the box
                </p>
              </div>
            </div>
          </div>
          {/* Section 3 */}
          <div className="bg-gray-100 border-t border-b border-gray-300  border-solid px-4">
            <div className="max-w-5xl mx-auto flex justify-between gap-12 py-8 lg:py-20">
              <div className="w-[100%] lg:w-[80%] hidden md:block">
                <img
                  src="/img/test-script.svg"
                  alt="test-script"
                  className="align-top object-fill"
                />
              </div>
              <div className="text-left">
                <p className="text-primary mb-2 text-lg font-semibold">
                  Distributed load tests
                </p>
                <h1 className="text-4xl md:text-[44px] font-medium tracking-tight leading-tight md:leading-[52px] mt-2">
                  Write load tests using k6 and distribute with K8s
                </h1>
                <p className="text-xl text-gray-600 mt-2 leading-relaxed">
                  Define your load tests in JavaScript using k6, and run
                  distributed tests using the k6 Kubernetes operator.{" "}
                </p>
                <img
                  src="/img/test-script.svg"
                  alt="test-script"
                  className="max-w-[450px] md:hidden w-[90%] mx-auto"
                />
                <p className="uppercase text-large tracking-wide font-semibold text-gray-700 mt-6 mb-2">
                  Technologies
                </p>
                <div className="flex gap-4 md:mt-3">
                  <img src="/img/k6.svg" />
                  <img src="/img/javascript.svg" />
                  <img src="/img/go.svg" />
                  <img src="/img/kubernetes.svg" />
                </div>
                <a
                  href="/case-study"
                  className="text-white font-normal px-5 text-lg py-3 rounded-full bg-[#109BD1] antialiased inline-block mt-6 hover:no-underline hover:text-white hover:bg-primaryLight transition"
                >
                  Read case study
                </a>
              </div>
            </div>
          </div>
          {/* Section 4 */}
          <div>
            <div className="max-w-5xl mx-auto flex justify-between gap-12 py-8 lg:py-24 items-start px-4">
              <div className="text-left">
                <p className="text-primaryLight text-lg font-semibold mb-2">
                  Self-hosted
                </p>
                <h1 className="text-4xl md:text-[44px] font-medium tracking-tight leading-tight md:leading-[52px] ">
                  Automated deployment to your own AWS account{" "}
                </h1>
                <p className="text-xl text-gray-600 mt-2 leading-relaxed">
                  Edamame automatically spins up AWS infrastructure and runs
                  load tests on EC2 instances running in EKS. You keep 100%
                  control of your data, and only pay for the AWS resources you
                  use.
                </p>
                <div className="sm:w-[80%]">
                  <img
                    src="/img/automated-deployment.svg"
                    className="mt-10 block md:hidden"
                  />
                </div>
                <a
                  href="/case-study"
                  className="text-white font-normal px-5 text-lg py-3 rounded-full bg-primary hover:bg-primaryLight transition inline-block mt-6 hover:no-underline hover:text-white md:mt-2"
                >
                  Read case study
                </a>
              </div>
              <img
                src="/img/automated-deployment.svg"
                className="mt-10 max-w-[450px] hidden md:block"
              />
            </div>
          </div>
          {/* Section 5 */}
          <div className="bg-gray-100 border-t border-b border-solid border-gray-300 py-8 md:py-14 text-center px-4">
            <div className="max-w-5xl mx-auto">
              <div className="max-w-3xl mx-auto">
                <img className="mx-auto" src="/img/react-icon.svg" />
                <h1 className="text-4xl md:text-[44px] tracking-tight leading-tight md:leading-[52px] mt-2 font-medium">
                  Use the CLI or GUI to manage your tests
                </h1>
                <p className="text-xl text-gray-600 mt-2 leading-relaxed">
                  Our React-based GUI allows you to start a test, open Grafana
                  dashboards to visualize test metrics, and optionally end tests
                  early.
                </p>
                <Link
                  href="/docs"
                  className="text-white font-normal px-5 text-lg py-3 rounded-full bg-primary inline-block antialiased mt-0 hover:no-underline hover:text-white hover:bg-primaryLight transition"
                >
                  Read the docs
                </Link>
              </div>
              <img src="/img/react-dashboard.png" className="mt-6 w-[100%]" />
            </div>
          </div>
          {/* Section 6 */}
          <div className="bg-gray-900 antialiased text-white py-10 text-center px-4">
            <p className="text-cyan-400 font-semibold mb-2">Visualization</p>
            <h1 className="text-white text-4xl md:text-[44px] tracking-tighter leading-tight md:leading-[52px] max-w-3xl mx-auto font-medium ">
              Dashboards for both WebSocket and HTTP metrics
            </h1>
            <p className="text-xl mx-auto text-center max-w-4xl text-gray-300 mt-2 leading-10">
              Use our custom Grafana dashboards or define your own
            </p>
            <img
              src="/img/grafana.png"
              className="mx-auto mt-8 max-w-4 block max-w-5xl w-[90%]"
            />
            <div className="border-cyan-700 border-solid border bg-cyan-950 max-w-2xl mx-auto rounded-md py-4 text:base md:text-lg px-4 mt-10 relative">
              Includes{" "}
              <span className="font-bold">custom WebSocket metrics</span> using
              the Edamame k6 extension written in Go
              <img
                src="/img/gopher.png"
                className="absolute top-3 -right-[4%] animate-wiggle"
              ></img>
            </div>
          </div>
        </div>
        {/* Section 6 */}
        <div className="text-center px-4 placeholder-gray-200 py-8 md:py-16">
          <div className="mx-auto">
            <p className="uppercase text-large tracking-wide font-semibold text-gray-600 mb-2">
              Created By
            </p>
            <svg
              class="svg mx-auto mb-10"
              width="140"
              height="21"
              viewBox="0 0 183 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2C2 2 173.648 2 178.591 2C183.534 2 80.2386 12 74.2727 12.4348C68.3068 12.8696 176.375 19.2826 181.489 19.2826"
                stroke="#3197D0"
                stroke-width="4"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 md:gap-4 max-w-5xl md:grid-cols-4 mx-auto mt-6">
            <div>
              <a href="https://www.linkedin.com/in/albert-dorfman-05838166/">
                <div className="bg-gray-200 py-4 px-6">
                  <img src="/img/albert.png" />
                </div>
              </a>
              <p
                className="text-gray-800 text-lg font-semibold text-left mt-2 mb-0 "
                id="team"
              >
                Albert Dorfman
              </p>
              <p className="text-gray-600 text-left mb-1">Toronto, Canada</p>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/albert-dorfman-05838166/"
                  className="hover:text-primary"
                >
                  <img src="/img/linkedin.svg" />
                </a>
                <a href="https://www.albertdorfman.com">
                  <img src="/img/globe.svg" />
                </a>
              </div>
            </div>
            <div className="">
              <a
                href="https://www.linkedin.com/in/luke-oguro/"
                className="hover:no-underline
              "
              >
                <div className="bg-gray-200 py-4 px-6">
                  <img src="/img/luke.png" />
                </div>
                <p className="text-gray-800 text-lg font-semibold text-left mt-2 mb-0">
                  Luke Oguro
                </p>
                <p className="text-gray-600 text-left mb-1">
                  Philadelphia, USA
                </p>
                <div className="flex gap-2">
                  <a
                    href="https://www.linkedin.com/in/luke-oguro/"
                    className="hover:text-primary"
                  >
                    <img src="/img/linkedin.svg" />
                  </a>
                  <a
                    href="https://www.lukeoguro.com"
                    className="hover:text-primary"
                  >
                    <img src="/img/globe.svg" />
                  </a>
                </div>
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/ginni-pinckert-a20363102/"
                className="hover:no-underline"
              >
                <div className="bg-gray-200 py-4 px-6">
                  <img src="/img/ginni.png" />
                </div>
                <p className="text-gray-800 text-lg font-semibold text-left mt-2 mb-0">
                  Ginni Pinkert
                </p>
                <p className="text-gray-600 text-left mb-1">Los Angeles, USA</p>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/ginni-pinckert-a20363102/">
                    <img src="/img/linkedin.svg" />
                  </a>
                  <a href="http://ginnipinckert.com">
                    <img src="/img/globe.svg" />
                  </a>
                </div>
              </a>
            </div>
            <div className="">
              <a
                href="https://www.linkedin.com/in/rachel-west-9a7349113/"
                className="hover:no-underline"
              >
                <div className="bg-gray-200 py-4 px-6">
                  <img src="/img/rachel.png" />
                </div>
                <p className="text-gray-800 text-lg font-semibold text-left mt-2 mb-0">
                  Rachel West
                </p>
                <p className="text-gray-600 text-left mb-1">Mount Rocky, USA</p>
                <div className="flex gap-2">
                  <a href="https://www.linkedin.com/in/rachel-west-9a7349113/">
                    <img src="/img/linkedin.svg" />
                  </a>
                  <a href="https://westrachel.com">
                    <img
                      src="/img/globe.svg"
                      className="hover:stroke-primary"
                    />
                  </a>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

import App, { Container } from "next/app";
import React from "react";
import io from "socket.io-client";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className="all">
        <Container>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </div>
    );
  }
}

export default MyApp;

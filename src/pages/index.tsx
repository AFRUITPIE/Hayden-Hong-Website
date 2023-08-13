import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React from "react";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout>
      <main>
        <p>
          This is supposed to redirect <a href="/blog">here</a>.
        </p>
      </main>
    </Layout>
  );
}

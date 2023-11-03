import Head from 'next/head';
import Overview from '../components/Overview';
import Home from '../components/Home';

const OverviewPage = () => (
  <>
    <Head>
      <link rel="stylesheet" href="/react-vis.css" />
    </Head>
    <Home />
  </>
);

export default OverviewPage;

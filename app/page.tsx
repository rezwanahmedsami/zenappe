// app/page.tsx
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import FileList component dynamically
const FileList = dynamic(() => import('../components/FileList'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <Head>
        <title>Zenappe</title>
        <meta name="description" content="Zenappe - FTP and File Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
        <FileList />
      </main>
    </div>
  );
};

export default Home;

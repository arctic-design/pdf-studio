import { Suspense } from 'react';
import { AppStudio } from 'src/components/AppStudio';
import { Header } from 'src/components/Header';
import { Loading } from 'src/components/Loading';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <main>
      <Header />
      <Suspense fallback={<Loading />}>
        <AppStudio />
      </Suspense>
    </main>
  );
}

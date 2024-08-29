import { RouterProvider, createRouter } from '@tanstack/react-router';
import { DAppProvider } from './providers/dapp-provider';
import { routeTree } from './routeTree.gen';
import { Suspense } from 'react';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
function App() {
  return (
    <DAppProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </DAppProvider>
  );
}

export default App;

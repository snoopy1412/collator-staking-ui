import { createLazyFileRoute } from '@tanstack/react-router';
import Stake from '@/view/stake';
import NotFound from '@/components/not-found';
import Error from '@/components/error';

export const Route = createLazyFileRoute('/')({
  component: () => <Stake />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});

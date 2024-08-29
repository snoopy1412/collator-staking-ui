import { createLazyFileRoute } from '@tanstack/react-router';
import Deposit from '@/view/deposit';
import NotFound from '@/components/not-found';
import Error from '@/components/error';

export const Route = createLazyFileRoute('/deposit')({
  component: () => <Deposit />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});

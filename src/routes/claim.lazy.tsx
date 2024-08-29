import { createLazyFileRoute } from '@tanstack/react-router';
import Claim from '@/view/claim';
import NotFound from '@/components/not-found';
import Error from '@/components/error';

export const Route = createLazyFileRoute('/claim')({
  component: () => <Claim />,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <Error />
});

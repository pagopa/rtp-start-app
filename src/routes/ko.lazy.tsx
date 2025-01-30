import { createLazyFileRoute } from '@tanstack/react-router';
import KOPage from 'src/pages/KOPage';

export const Route = createLazyFileRoute('/ko')({
  component: KOPage,
});

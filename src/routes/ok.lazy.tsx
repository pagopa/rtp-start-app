import { createLazyFileRoute } from '@tanstack/react-router';
import OKPage from 'src/pages/OKPage';

export const Route = createLazyFileRoute('/ok')({
  component: OKPage,
});

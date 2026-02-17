import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { AppShell } from './components/AppShell';
import { TemplateGalleryPage } from './pages/TemplateGalleryPage';
import { ResumeEditorPage } from './pages/ResumeEditorPage';
import { ResumePreviewPage } from './pages/ResumePreviewPage';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: TemplateGalleryPage,
});

const editorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/editor',
  component: ResumeEditorPage,
});

const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview',
  component: ResumePreviewPage,
});

const routeTree = rootRoute.addChildren([indexRoute, editorRoute, previewRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

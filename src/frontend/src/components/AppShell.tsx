import type { ReactNode } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { FileText, CheckCircle2 } from 'lucide-react';
import { SiFacebook, SiInstagram, SiWhatsapp } from 'react-icons/si';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const steps = [
    { path: '/', label: 'Choose Template', icon: FileText },
    { path: '/editor', label: 'Fill Details', icon: FileText },
    { path: '/preview', label: 'Preview & Download', icon: CheckCircle2 },
  ];

  const currentStepIndex = steps.findIndex((step) => step.path === currentPath);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <header className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-b border-amber-200 dark:border-neutral-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate({ to: '/' })}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/assets/generated/trainer-punit-round-final-logo.dim_256x256.png"
                alt="Trainer Punit"
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Resume Maker</h1>
            </button>

            <nav className="hidden md:flex items-center gap-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                  <div key={step.path} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isActive
                          ? 'bg-amber-600 text-white shadow-md'
                          : isCompleted
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                          : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-0.5 bg-neutral-200 dark:bg-neutral-700 mx-1" />
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-t border-amber-200 dark:border-neutral-700 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="/assets/generated/trainer-punit-round-final-logo.dim_256x256.png"
                alt="Trainer Punit"
                className="h-10 w-10 object-contain"
              />
              <div className="flex flex-col gap-1">
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  <span>© {new Date().getFullYear()} Resume Maker</span>
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Developed and Maintained by{' '}
                  <a
                    href="https://www.trainerpunit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium"
                  >
                    Trainer Punit
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-amber-600 dark:text-neutral-400 dark:hover:text-amber-400 transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

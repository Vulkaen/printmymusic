import { clerkMiddleware } from '@clerk/nextjs/server';

// Standardmäßig bleiben alle Routen öffentlich zugänglich - Login wird
// gezielt nur beim Export-Vorgang abgefragt (siehe ExportControls.tsx),
// nicht pauschal für die ganze Seite erzwungen.
export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico)).*)',
    '/(api|trpc)(.*)'
  ]
};

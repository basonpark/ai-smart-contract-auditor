import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function FreeOfferPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-16 text-center">
      <h1 className="heading-lg gradient-text mb-8">
        Special Offer!
      </h1>
      <p className="text-2xl md:text-3xl text-muted-foreground mb-12 max-w-3xl">
        All audits are offered completely free for now while we are in beta.
        Take advantage of our full capabilities!
      </p>
      <Link href="/">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}


'use client';

import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement actual login logic here
    console.log('Login form submitted');
    // For now, you can add a toast message or redirect
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 selection:bg-primary/30">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="text-center space-y-2">
          <Link href="/" aria-label="Back to home">
             {/* You can use your OrionLogo component here if you export it or create a simplified one */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12 mx-auto text-primary"
            >
              <defs>
                <linearGradient id="loginLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#loginLogoGradient)" stroke="url(#loginLogoGradient)" />
              <path d="M2 17l10 5 10-5" stroke="url(#loginLogoGradient)" />
              <path d="M2 12l10 5 10-5" stroke="url(#loginLogoGradient)" />
            </svg>
          </Link>
          <CardTitle className="font-headline text-3xl font-bold">
            Sign In
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Access your Orion Admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  className="pl-10 py-2.5 text-base"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password"  className="text-sm font-medium">Password</Label>
               <div className="relative flex items-center">
                <Lock className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="pl-10 py-2.5 text-base"
                />
              </div>
            </div>
             <div className="flex items-center justify-between text-sm">
                {/* Placeholder for "Remember me" if needed */}
                {/* <div className="flex items-center gap-2">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me">Remember me</Label>
                </div> */}
                <Link
                href="#"
                className="font-medium text-primary hover:text-primary/80 hover:underline"
                >
                Forgot password?
                </Link>
            </div>
            <Button type="submit" className="w-full font-semibold text-base py-3 h-11">
              Sign In
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="#" className="font-medium text-primary hover:text-primary/80 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

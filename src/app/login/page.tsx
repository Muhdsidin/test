"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { StartexHubLogo } from "@/components/icons/startex-hub-logo"; // Changed import
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router =useRouter()

 const handleSubmit = async (event : React.FormEvent) => {
  event.preventDefault();

  const response = await axios.post("/api/login", {
    email,
    password,
  });
  console.log(response.data)
  Cookies.set("token", response.data.token);

  if (response.data.success) {
   console.log("ok")
   router.push('/admin/posts')
  } else {
    alert("Login failed");
  }
};
;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 selection:bg-primary/30">
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="text-center space-y-2">
          <Link href="/" aria-label="Back to home">
            {/* Changed to StartexHubLogo */}
            <StartexHubLogo className="h-10 w-auto mx-auto" />
          </Link>
          <CardTitle className="font-headline text-3xl font-bold">
            Log In
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Access For Startex Hub Admin panel. {/* Updated text */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10 py-2.5 text-base"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
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
              {/* <Link
                href="#"
                className="font-medium text-primary hover:text-primary/80 hover:underline"
                >
                Forgot password?
                </Link> */}
            </div>
            <Button
              type="submit"
              className="w-full font-semibold text-base py-3 h-11"
            >
              Sign In
            </Button>
          </form>
          {/* <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="#" className="font-medium text-primary hover:text-primary/80 hover:underline">
              Sign up
            </Link>
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
}

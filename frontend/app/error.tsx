"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-lg flex flex-col items-center justify-center min-h-[50vh]">
      <Card className="w-full text-center border-red-100 dark:border-red-900/50 shadow-sm">
        <CardHeader className="pb-4 pt-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
              <AlertCircle className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">Something went wrong!</CardTitle>
          <CardDescription className="text-base mt-2">
            Failed to load data. The server might be down or returned an error.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <Button onClick={() => reset()} variant="default" className="w-full sm:w-auto">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

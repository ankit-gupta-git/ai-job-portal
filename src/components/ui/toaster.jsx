import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "bg-background text-foreground border border-border shadow-lg",
        },
      }}
    />
  );
}

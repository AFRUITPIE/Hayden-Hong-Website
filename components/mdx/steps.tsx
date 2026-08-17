import { cn } from "@/lib/utils";

export function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("my-6 ml-3 border-l pl-7 [counter-reset:step]", className)}
      {...props}
    />
  );
}

export function Step({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative mb-8 [counter-increment:step] last:mb-0",
        // The numbered marker sits on the vertical rule drawn by <Steps>.
        "before:absolute before:-left-[42px] before:flex before:size-7 before:items-center before:justify-center",
        "before:rounded-full before:bg-muted before:text-sm before:font-medium before:text-muted-foreground",
        "before:content-[counter(step)]",
        "[&>h3]:mt-0 [&>h3]:mb-2 [&>h3]:text-base [&>h3]:font-medium",
        className,
      )}
      {...props}
    />
  );
}

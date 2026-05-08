import { cn } from "@/lib/utils";

function InputGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex h-10 w-full items-center gap-2 rounded-lg border border-input bg-background px-3 text-sm  transition-colors !duration-75 hover:border-border focus-within:border-ring ",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }) {
  return (
    <input
      data-slot="input-group-input"
      className={cn(
        "min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function InputGroupAddon({ className, align, ...props }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex shrink-0 items-center gap-1 text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0",
        align === "inline-end" && "ml-auto",
        className,
      )}
      {...props}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupInput };

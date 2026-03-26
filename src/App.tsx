import { useState } from "react";
import { Button, Select, ListBox } from "@heroui/react";
import { BadgeInfo, BadgeCheck, BadgeAlert, BadgeX } from "lucide-react";
import {
  AnimatedToaster,
  showAnimatedToast,
} from "./components/ui/animated-toast";

const positions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const;

type Position = (typeof positions)[number];

function App() {
  const [position, setPosition] = useState<Position>("top-center");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-8">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Animated Toasts</h1>
        <p className="text-sm text-gray-500">
          Built on top of Sonner with GSAP animations
        </p>
      </div>
      <Select
        placeholder="Select position"
        selectedKey={position}
        onSelectionChange={(key) => setPosition(key as Position)}
        className="w-48"
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover>
          <ListBox>
            {positions.map((p) => (
              <ListBox.Item key={p} id={p} textValue={p}>
                {p}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <Button
          variant="secondary"
          className="bg-sky-100 text-sky-700 w-full py-6 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
          onPress={() =>
            showAnimatedToast({
              variant: "info",
              message: "Your changes have been saved",
              position,
            })
          }
        >
          <BadgeInfo className="size-4" />
          info
        </Button>
        <Button
          variant="secondary"
          className="bg-emerald-100 text-emerald-700 w-full py-6 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
          onPress={() =>
            showAnimatedToast({
              variant: "success",
              message: "Operation completed successfully",
              position,
            })
          }
        >
          <BadgeCheck className="size-4" />
          success
        </Button>
        <Button
          variant="secondary"
          className="bg-amber-100 text-amber-700 w-full py-6 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
          onPress={() =>
            showAnimatedToast({
              variant: "warning",
              message: "Please review before continuing",
              position,
            })
          }
        >
          <BadgeAlert className="size-4" />
          warning
        </Button>
        <Button
          variant="secondary"
          className="bg-red-100 text-red-700 w-full py-6 text-lg transition-all sm:w-auto sm:py-2 sm:text-sm"
          onPress={() =>
            showAnimatedToast({
              variant: "error",
              message: "Something went wrong",
              position,
            })
          }
        >
          <BadgeX className="size-4" />
          error
        </Button>
      </div>
      <AnimatedToaster />
    </div>
  );
}

export default App;

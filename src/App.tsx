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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
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
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="bg-sky-100 text-sky-700"
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
          className="bg-emerald-100 text-emerald-700"
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
          className="bg-amber-100 text-amber-700"
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
          className="bg-red-100 text-red-700"
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

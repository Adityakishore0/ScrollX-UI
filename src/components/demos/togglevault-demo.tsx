import {
  ToggleVault,
  ToggleVaultTrigger,
  ToggleVaultContent,
} from "@/components/ui/toggle-vault";

export default function ToggleVaultDemo() {
  return (
    <div className="relative w-full max-w-[900px] h-[500px] border rounded-lg bg-background overflow-hidden flex items-start justify-end p-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-lg font-semibold text-muted-foreground">
          Click on the Menu button to see the Effect.
        </p>
      </div>
      <ToggleVault>
        <ToggleVaultTrigger
          buttonSize={{
            width: "w-[100px]",
            height: "h-[40px]",
            rounded: "rounded-full",
          }}
          lightColors={{
            closedBg: "bg-gray-900",
            closedText: "text-white",
            openBg: "bg-white",
            openText: "text-black",
          }}
          darkColors={{
            closedBg: "bg-white",
            closedText: "text-black",
            openBg: "bg-gray-900",
            openText: "text-white",
          }}
          className="shadow-lg shadow-current/50"
        >
          {({ open }) => (open ? "CLOSE" : "MENU")}
        </ToggleVaultTrigger>

        <ToggleVaultContent
          panelSize={{
            width: "w-[400px]",
            height: "h-[350px]",
            rounded: "rounded-2xl",
          }}
          lightColors={{
            panelBg: "bg-gray-900",
            panelText: "text-white",
          }}
          darkColors={{
            panelBg: "bg-white",
            panelText: "text-black",
          }}
          panelClassName="shadow-xl shadow-current/40"
          innerClassName="p-12 flex flex-col gap-3 font-bold text-4xl md:text-4xl"
        >
          {({ close }) => (
            <>
              <a href="#hero" onClick={close} className="hover:opacity-70">
                HOME
              </a>
              <a href="#about" onClick={close} className="hover:opacity-70">
                ABOUT
              </a>
              <a href="#projects" onClick={close} className="hover:opacity-70">
                PROJECTS
              </a>
              <a href="#resume" onClick={close} className="hover:opacity-70">
                RESUME
              </a>
              <a href="#contact" onClick={close} className="hover:opacity-70">
                CONTACT
              </a>
            </>
          )}
        </ToggleVaultContent>
      </ToggleVault>
    </div>
  );
}

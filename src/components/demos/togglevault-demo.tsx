import {
  ToggleVault,
  ToggleVaultTrigger,
  ToggleVaultContent,
  ToggleVaultClose,
} from "@/components/ui/toggle-vault";

export default function ToggleVaultDemo() {
  return (
    <div className="relative w-full ">
      <ToggleVault>
        <ToggleVaultTrigger className="w-20 h-8 text-sm">
          MENU
        </ToggleVaultTrigger>
        <ToggleVaultClose className="w-20 h-8 text-sm">
          CLOSE
        </ToggleVaultClose>
        <ToggleVaultContent className="w-[300px] h-[250px] p-8 text-xl flex flex-col gap-4">
          <a href="#home">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </ToggleVaultContent>
      </ToggleVault>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-center text-2xl md:text-3xl font-semibold">
          Click on the Menu button to see the Effect
        </p>
      </div>
    </div>
  );
}

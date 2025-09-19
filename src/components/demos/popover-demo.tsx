import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Settings</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 space-y-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="https://github.com/Adityakishore0.png"
              alt="User avatar"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">Ahdeetai</h4>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer
            </p>
          </div>
        </div>
        <div className="space-y-3 p-3 bg-muted/20 rounded-md">
          <div className="space-y-1">
            <h4 className="font-medium text-sm">User Preferences</h4>
            <p className="text-xs text-muted-foreground">
              Customize your account settings below.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Label htmlFor="Name" className="w-24">
                Name
              </Label>
              <Input id="Name" defaultValue="Ahdeetai" className="flex-1 h-8" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Label htmlFor="theme" className="w-24">
                Theme
              </Label>
              <Input
                id="theme"
                placeholder="Light / Dark"
                defaultValue="Dark"
                className="flex-1 h-8"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Label htmlFor="notifications" className="w-24">
                Notifications
              </Label>
              <Input
                id="notifications"
                placeholder="Enabled / Disabled"
                defaultValue="Enabled"
                className="flex-1 h-8"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <Button variant="outline" className="flex-1 mr-2">
            Logout
          </Button>
          <Button variant="default" className="flex-1 ml-2">
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/animated-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`bg-primary text-primary-foreground shadow hover:bg-primary/90
         inline-flex items-center justify-center gap-2 whitespace-nowrap
         rounded-md text-sm font-medium transition-colors
         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
         disabled:pointer-events-none disabled:opacity-50
         [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2`}
    >
      {children}
    </button>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none
         file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
         disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
         focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
         aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`}
    />
  );
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {children}
    </label>
  );
}

export default function AnimatedTabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="profile-fullname">Full Name</Label>
                <Input id="profile-fullname" defaultValue="Ahdeetai" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="profile-email">Email</Label>
                <Input id="profile-email" defaultValue="ahdeetai@example.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Profile</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>
                Configure your preferences below.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="settings-language">Preferred Language</Label>
                <Input id="settings-language" defaultValue="English" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="settings-theme">Theme</Label>
                <Input id="settings-theme" defaultValue="Light" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

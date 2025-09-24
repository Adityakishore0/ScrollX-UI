import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star, Users, Clock, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function CardDemo() {
  const { toast } = useToast();

  const handleAddToWishlist = () => {
    toast("Jungle Safari Added to Wishlist!", { duration: 2000 });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col gap-1 px-4 py-2">
        <div className="flex items-start w-full">
          <CardTitle className="text-lg font-semibold">
            Jungle Safari Adventure
          </CardTitle>
          <CardAction className="ml-auto">
            <Button
              variant="link"
              size="sm"
              className="p-0 hover:underline"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </Button>
          </CardAction>
        </div>
        <CardDescription className="text-sm text-gray-600 mt-1">
          Explore the wild and enjoy a thrilling jungle safari experience.
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col gap-2 px-4">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Jungle Safari"
          className="w-full h-32 object-cover rounded-md"
        />

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>4.8 (120 reviews)</span>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>5 hrs</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Group: 20</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span>Rainforest</span>
        </div>
        <Button className="rounded-md px-4 py-1 text-sm transition-colors">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}

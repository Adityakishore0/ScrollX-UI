"use client";
import { useState, useEffect } from "react";
import { Iphone } from "@/components/ui/iphone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MoreVertical,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  User,
  X,
} from "lucide-react";

export default function IphoneDemo() {
  const [liked, setLiked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [activeTab, setActiveTab] = useState("explore");
  const [showNotification, setShowNotification] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(2);

  const interests = ["Shishang", "Zhongwen", "Yinyue", "Dianying", "Yundong"];
  const mutualFriends = [
    {
      username: "@Yishabeier",
      image:
        "https://cdn.pixabay.com/photo/2024/08/01/18/20/anime-8937917_1280.png",
      name: "Yishabeier",
      location: "Shanghai, Zhongguo",
    },
    {
      username: "@Aoliweiya",
      image:
        "https://cdn.pixabay.com/photo/2023/01/30/21/20/portrait-7756638_1280.jpg",
      name: "Aoliweiya",
      location: "Beijing, Zhongguo",
    },
    {
      username: "@ChenXi",
      image:
        "https://cdn.pixabay.com/photo/2023/06/26/04/38/ai-generated-8088680_1280.jpg",
      name: "Chen Xi",
      location: "Guangzhou, Zhongguo",
    },
    {
      username: "@Sufiya",
      image:
        "https://cdn.pixabay.com/photo/2023/02/07/10/50/ai-generated-7773822_1280.jpg",
      name: "Sufiya",
      location: "Shenzhen, Zhongguo",
    },
    {
      username: "@Anuosa",
      image:
        "https://cdn.pixabay.com/photo/2023/06/27/03/15/ai-generated-8091289_1280.jpg",
      name: "Anuosa",
      location: "Hangzhou, Zhongguo",
    },
  ];

  const currentProfile = mutualFriends[currentProfileIndex];

  const handleLike = () => {
    setLiked(true);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      setTimeout(() => setLiked(false), 300);
    }, 2000);
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  useEffect(() => {
    if (dismissed) {
      const timer = setTimeout(() => {
        setDismissed(false);
        setCurrentProfileIndex((prev) => (prev + 1) % mutualFriends.length);
      }, 2300);

      return () => clearTimeout(timer);
    }
  }, [dismissed, mutualFriends.length]);

  if (dismissed) {
    return (
      <div className="w-full max-w-sm mx-auto p-4">
        <Iphone showHeader>
          <div className="absolute inset-0 z-50">
            <img
              src="https://cdn.pixabay.com/photo/2025/01/13/12/29/ai-generated-9330361_1280.jpg"
              alt="Profile Passed"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 w-4/5 max-w-sm text-center shadow-xl border border-white/20 animate-in slide-in-from-bottom duration-500">
                <div className="text-6xl mb-4">💔</div>
                <h2 className="text-2xl font-bold mb-2 text-white">
                  Profile Passed
                </h2>
                <p className="text-white/80 mb-6">
                  Looking for your next match...
                </p>
                <Button
                  onClick={() => setDismissed(false)}
                  className="bg-white text-pink-600 hover:bg-white/90 w-full"
                >
                  Undo
                </Button>
              </div>
            </div>
          </div>
        </Iphone>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      <Iphone showHeader>
        <div className="absolute inset-0 bg-black z-10">
          <img
            src={currentProfile.image}
            alt="Profile picture"
            className={`w-full h-full object-cover transition-all duration-500 ${
              liked ? "scale-110" : "scale-100"
            }`}
            key={currentProfileIndex}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-20" />
          {showNotification && (
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg whitespace-nowrap flex items-center gap-2 animate-in slide-in-from-top duration-300">
              <Heart className="h-4 w-4 fill-white flex-shrink-0" />
              <span className="text-sm font-medium">It's a Match! 💕</span>
            </div>
          )}
          <div className="absolute sm:top-10 top-5 left-0 right-0 z-50 flex items-center justify-between px-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full h-10 w-10 transition-all hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full h-10 w-10 transition-all hover:scale-110"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 sm:gap-3">
            <Button
              size="icon"
              className={`rounded-full transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12 shadow-lg hover:scale-110 ${
                liked
                  ? "bg-pink-600 animate-pulse"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
              onClick={handleLike}
            >
              <Heart
                className={`h-4 w-4 sm:h-5 sm:w-5 fill-white text-white transition-transform ${
                  liked ? "scale-125" : "scale-100"
                }`}
              />
            </Button>
            <Button
              size="icon"
              className={`rounded-full transition-all duration-300 h-10 w-10 sm:h-12 sm:w-12 shadow-lg hover:scale-110 bg-white hover:bg-white/90`}
            >
              <Home
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors text-neutral-900`}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full bg-white/10 hover:bg-white/20 h-10 w-10 sm:h-12 sm:w-12 backdrop-blur-sm transition-all hover:scale-110 hover:rotate-90"
              onClick={handleDismiss}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-40 px-4 sm:px-5 pb-20 sm:pb-28">
            <h1 className="text-white text-xl sm:text-3xl font-bold mb-1 animate-in slide-in-from-bottom duration-500">
              {currentProfile.name}
            </h1>
            <div className="flex items-center gap-1.5 text-white/90 mb-2 sm:mb-4 animate-in slide-in-from-bottom duration-500 delay-75">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm">
                {currentProfile.location}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-5 animate-in slide-in-from-bottom duration-500 delay-150">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-0.5 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-medium bg-white/15 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/25 hover:scale-105 cursor-pointer"
                >
                  {interest}
                </span>
              ))}
            </div>
            <div className="flex items-end justify-center gap-1 sm:gap-2 animate-in slide-in-from-bottom duration-500 delay-200">
              {mutualFriends.map((friend, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => setCurrentProfileIndex(index)}
                >
                  <Avatar
                    className={`${
                      index === currentProfileIndex
                        ? "h-10 w-10 sm:h-14 sm:w-14"
                        : "h-8 w-8 sm:h-12 sm:w-12"
                    } border-2 ${
                      currentProfileIndex === index
                        ? "border-pink-500"
                        : "border-white/40"
                    } shadow-lg transition-all hover:scale-110 group-hover:border-pink-400`}
                  >
                    <AvatarImage src={friend.image} className="object-cover" />
                    <AvatarFallback className="bg-gray-700 text-white text-[8px] sm:text-xs">
                      {friend.username.slice(1, 3).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {index === currentProfileIndex && (
                    <span className="text-white text-[8px] sm:text-[10px] font-medium mt-0.5 sm:mt-1">
                      {friend.username}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-t border-white/10">
            <div className="flex items-center justify-around px-4 sm:px-8 py-2 sm:py-3 pb-3 sm:pb-6">
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full h-9 w-9 sm:h-12 sm:w-12 transition-all ${
                  activeTab === "home"
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("home")}
              >
                <Home className="h-4 w-4 sm:h-6 sm:w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full h-9 w-9 sm:h-12 sm:w-12 relative transition-all ${
                  activeTab === "explore"
                    ? "text-pink-500 bg-white/10"
                    : "text-pink-500 hover:bg-white/10"
                }`}
                onClick={() => setActiveTab("explore")}
              >
                <MapPin className="h-4 w-4 sm:h-6 sm:w-6 fill-pink-500" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full h-9 w-9 sm:h-12 sm:w-12 transition-all ${
                  activeTab === "chat"
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 " />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full h-9 w-9 sm:h-12 sm:w-12 transition-all ${
                  activeTab === "user"
                    ? "text-white bg-white/10"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                <User className="h-4 w-4 sm:h-6 sm:w-6 " />
              </Button>
            </div>
          </div>
        </div>
      </Iphone>
    </div>
  );
}

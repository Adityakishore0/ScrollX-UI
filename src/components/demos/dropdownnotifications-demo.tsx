"use client";

import * as React from "react";
import Dropdown, { MenuItem } from "@/components/ui/dropdown";
import {
  Mail,
  Bell,
  FileText,
  Coffee,
  BookOpen,
  Settings,
  CheckSquare,
  Calendar,
  Users,
  Activity,
} from "lucide-react";

export default function DropdownNotificationsDemo() {
  const notificationMenuItems: MenuItem[] = [
    {
      title: "Messages",
      description: "View your inbox",
      icon: <Mail className="w-5 h-5 text-indigo-400" />,
    },
    {
      title: "Notifications",
      description: "See your recent alerts",
      icon: <Bell className="w-5 h-5 text-pink-400" />,
    },
    {
      title: "Documents",
      description: "Access your saved files",
      icon: <FileText className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: "Breaks",
      description: "Schedule your break time",
      icon: <Coffee className="w-5 h-5 text-amber-400" />,
    },
    {
      title: "Learning",
      description: "Access educational resources",
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: "Settings",
      description: "Update your preferences",
      icon: <Settings className="w-5 h-5 text-gray-400" />,
    },
    {
      title: "Tasks",
      description: "Review your to-do list",
      icon: <CheckSquare className="w-5 h-5 text-green-400" />,
    },
    {
      title: "Calendar",
      description: "See upcoming events",
      icon: <Calendar className="w-5 h-5 text-purple-400" />,
    },
    {
      title: "Team Updates",
      description: "Track team activity",
      icon: <Users className="w-5 h-5 text-blue-400" />,
    },
    {
      title: "System Logs",
      description: "Review system activities",
      icon: <Activity className="w-5 h-5 text-red-400" />,
    },
  ];

  return (
    <Dropdown
      menuItems={notificationMenuItems}
      triggerText="Notifications"
      menuTitle="Recent Activity"
      buttonVariant="gradient"
      buttonSize="default"
    />
  );
}

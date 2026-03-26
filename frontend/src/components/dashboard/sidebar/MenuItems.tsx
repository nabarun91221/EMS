import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconTicket,
  IconPlus,
  IconListDetails
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const AttendeeMenuItems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/attendee/dashboard",
  },

  {
    navlabel: true,
    subheader: "EVENTS",
  },

  {
    id: uniqueId(),
    title: "Browse Events",
    icon: IconCalendarEvent,
    href: "/attendee/events",
  },

  {
    id: uniqueId(),
    title: "My Registrations",
    icon: IconTicket,
    href: "/attendee/registrations",
  },
];

const OrganizerMenuItems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/organizer/dashboard",
  },

  {
    navlabel: true,
    subheader: "EVENT MANAGEMENT",
  },

  {
    id: uniqueId(),
    title: "Create Event",
    icon: IconPlus,
    href: "/organizer/events/create",
  },

  {
    id: uniqueId(),
    title: "Manage Events",
    icon: IconListDetails,
    href: "/organizer/events",
  },
];

export const getMenuItems = (role?: string) => {
  if (role === "ATTENDEE") {
    return AttendeeMenuItems;
  }

  return OrganizerMenuItems;
};
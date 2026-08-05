import type { Chalet } from "@/generated/prisma/client";

export type { Chalet, Booking } from "@/generated/prisma/client";
export { ChaletStatus, BookingStatus } from "@/generated/prisma/enums";

export type ChaletListItem = Pick<
  Chalet,
  | "id"
  | "slug"
  | "title"
  | "location"
  | "pricePerNight"
  | "bedrooms"
  | "maxGuests"
  | "amenities"
  | "images"
  | "status"
  | "featured"
>;

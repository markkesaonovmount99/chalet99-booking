import { z } from "zod";

const phoneRegex = /^[+]?[\d\s().-]{7,20}$/;

export const bookingSchema = z
  .object({
    chaletId: z.string().min(1),
    guestName: z.string().trim().min(2, "Введите имя"),
    guestEmail: z.string().trim().email("Введите корректный email"),
    guestPhone: z
      .string()
      .trim()
      .regex(phoneRegex, "Введите корректный номер телефона"),
    checkIn: z.string().min(1, "Выберите дату заезда"),
    checkOut: z.string().min(1, "Выберите дату выезда"),
    guests: z.coerce.number().int().min(1, "Минимум 1 гость"),
    comment: z.string().trim().max(1000).optional().or(z.literal("")),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Дата выезда должна быть позже даты заезда",
    path: ["checkOut"],
  })
  .refine(
    (data) => new Date(data.checkIn) >= new Date(new Date().toDateString()),
    { message: "Дата заезда не может быть в прошлом", path: ["checkIn"] },
  );

export type BookingInput = z.output<typeof bookingSchema>;
export type BookingFormInput = z.input<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Введите имя"),
  email: z.string().trim().email("Введите корректный email"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Введите корректный номер телефона")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Сообщение слишком короткое").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { Input, Label, Textarea, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [submitState, setSubmitState] = useState<
    { status: "idle" } | { status: "error"; message: string } | { status: "success" }
  >({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(data: ContactInput) {
    setSubmitState({ status: "idle" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setSubmitState({
          status: "error",
          message: "Не удалось отправить сообщение. Попробуйте ещё раз.",
        });
        return;
      }

      setSubmitState({ status: "success" });
      reset();
    } catch {
      setSubmitState({
        status: "error",
        message: "Не удалось отправить сообщение. Проверьте соединение.",
      });
    }
  }

  if (submitState.status === "success") {
    return (
      <div className="rounded-2xl border border-forest-900/10 bg-paper p-8 text-center">
        <CheckCircle2 className="mx-auto text-forest-700" size={40} />
        <h3 className="mt-4 font-serif text-xl text-forest-900">Сообщение отправлено</h3>
        <p className="mt-2 text-sm text-ink/60">
          Спасибо! Мы ответим вам в ближайшее время.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-6"
          onClick={() => setSubmitState({ status: "idle" })}
        >
          Написать ещё раз
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-forest-900/10 bg-paper p-6"
    >
      <div>
        <Label htmlFor="contact-name">Имя</Label>
        <Input id="contact-name" placeholder="Как к вам обращаться" {...register("name")} />
        <FieldError>{errors.name?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" placeholder="you@example.com" {...register("email")} />
        <FieldError>{errors.email?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="contact-phone">Телефон (необязательно)</Label>
        <Input id="contact-phone" type="tel" placeholder="+7 900 000-00-00" {...register("phone")} />
        <FieldError>{errors.phone?.message}</FieldError>
      </div>

      <div>
        <Label htmlFor="contact-message">Сообщение</Label>
        <Textarea id="contact-message" rows={5} placeholder="Ваш вопрос или пожелание" {...register("message")} />
        <FieldError>{errors.message?.message}</FieldError>
      </div>

      {submitState.status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitState.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Отправляем…" : "Отправить сообщение"}
      </Button>
    </form>
  );
}

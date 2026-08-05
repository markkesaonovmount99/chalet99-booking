import type { Metadata } from "next";
import { Input, Label } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { loginAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Вход в админ-панель",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  const sp = await searchParams;
  const hasError = Boolean(sp.error);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-6">
      <form
        action={loginAction}
        className="w-full space-y-5 rounded-2xl border border-forest-900/10 bg-paper p-8"
      >
        <div>
          <h1 className="font-serif text-2xl text-forest-900">Вход в админ-панель</h1>
          <p className="mt-1 text-sm text-ink/50">Шале 99 · управление заявками</p>
        </div>

        <div>
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" name="password" type="password" required autoFocus />
        </div>

        {hasError && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            Неверный пароль
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          Войти
        </Button>
      </form>
    </div>
  );
}

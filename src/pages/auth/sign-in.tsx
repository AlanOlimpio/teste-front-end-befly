import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import svgLogo from "@/assets/vite.svg";
import { ThemeToggle } from "@/components/theme/theme-toggle";


const signInform = z.object({

  identifier: z.string().refine(
    (val) => z.string().email().safeParse(val).success || z.string().min(3).safeParse(val).success,
    "Insira um nome de usuário ou e-mail válido."
  ),
  password: z.string().min(5, { message: "A senha é obrigatória." }),
});

type SignInForm = z.infer<typeof signInform>;

export function SignIn() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInform),
  });

  async function onSubmit(data: SignInForm) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return (
    <section className="w-full max-w-[300px] bg-white rounded-lg shadow dark:border md:mt-0  dark:bg-gray-800 dark:border-gray-700 p-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={svgLogo}
          alt="Vite logo"
        />
        <div className="flex items-center justify-between gap-1 mt-2">
          <h1 className="text-center text-1xl/9 font-bold tracking-tight dark:text-primary-foreground">
            Fazer login na sua conta
          </h1>
          <ThemeToggle /> </div>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="mb-4">
            <Label
              htmlFor="identifier"
              className="block text-sm/6 font-medium dark:text-primary-foreground"
            >
              Nome de usuário ou e-mail
            </Label>
            <div className="mt-2">
              <Input id="identifier" type="text" autoComplete="email" required  {...register("identifier")} className="block w-full rounded-md bg-white px-3 py-1.5 text-base dark:text-primary-foreground outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              {errors.identifier && (
                <span className="text-red-500 font-medium col-span-4">
                  {errors.identifier?.message}
                </span>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="block text-sm/6 font-medium dark:text-primary-foreground"
              >
                Senha
              </Label>
              <div className="text-sm">
              </div>
            </div>
            <div className="mt-2">
              <Input
                type="password"
                id="password"
                required
                {...register("password")}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base dark:text-primary-foreground outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {errors.password && (
                <span className="text-red-500 font-medium col-span-4">
                  {errors.password?.message}
                </span>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center bg-primary text-gray-900 shadow-xs hover:bg-primary/90 cursor-pointer"
              disabled={isSubmitting}
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};



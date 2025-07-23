import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import svgLogo from "@/assets/vite.svg";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { signIn } from "@/api/sign-in";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { AxiosError } from "axios";


const signInform = z.object({
  identifier: z.string().refine(
    (val) => z.string().email().safeParse(val).success || z.string().min(3).safeParse(val).success,
    "Insira um nome de usuário ou e-mail válido."
  ),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

type SignInForm = z.infer<typeof signInform>;

export function SignIn() {

  const { isAuthenticated } = useAuth();
  const errRef = useRef<HTMLParagraphElement>(null);
  const [errMsg, setErrMsg] = useState("");


  const {
    register,
    handleSubmit,
    reset,
    formState,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInform),
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { login } = useAuth();

  const watchFields = watch(["identifier", "password"])

  if (isAuthenticated) {
    navigate(from, { replace: true });
  }

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const res = await signIn({ username, password })
      return res.data;
    },
    onSuccess: (data) => {
      login(data.token)
    },

  });

  useEffect(() => {
    if (!formState.isSubmitSuccessful) {
      setErrMsg("");
    }
  }, [watchFields]);

  async function onSubmit(data: SignInForm) {
    try {
      await authenticate({ username: data.identifier, password: data.password });
      reset();
      navigate(from, { replace: true });

    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        setErrMsg("Nenhuma resposta do servidor");
      } else if (err.response?.status === 400) {
        setErrMsg("E-mail ou senha ausentes");
      } else if (err.response?.status === 401) {
        setErrMsg("Não autorizado");
      } else {
        setErrMsg("Falha no login");
      }
      errRef?.current?.focus();
    }
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
        <div
          ref={errRef}
          className={cn(
            errMsg
              ? "errmsg bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm/6 mb-4"
              : "offscreen"
          )}
          role="alert"
        >
          <strong className="font-bold">{errMsg}</strong>
        </div>
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



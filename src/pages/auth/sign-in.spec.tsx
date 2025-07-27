import '@testing-library/jest-dom';
import { QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "@/lib/react-query";
import { SignIn } from "@/pages/auth/sign-in";


describe("SignIn", () => {
  it("should set default email input value if email and password is present in parameters", async () => {
    render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={["/sign-in"]}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    });

    fireEvent.change(screen.getByLabelText("Nome de usuário ou e-mail"), {
      target: { value: "alan@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Nome de usuário ou e-mail")).toHaveValue("alan@example.com");
      expect(screen.getByLabelText("Senha")).toHaveValue("123456");
    });

  });
});

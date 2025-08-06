import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SignIn } from "@/pages/auth/sign-in";
import { beforeEach, type Mock } from 'vitest';
import { signIn } from '@/api/sign-in';
import { RenderWrapper } from '@/utils/renderWrapper';
import { vi } from 'vitest';
import { act } from 'react';


vi.mock('@/api/sign-in', () => {
  return {
    signIn: vi.fn()
  };
});

const mockSignIn = signIn as Mock;


const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

const mockContext = {
  loading: false,
  isAuthenticated: true,
  authToken: null,
  login: vi.fn(),
  logout: vi.fn(),
};


describe("SignIn", () => {

  it("should set default email input value if email and password is present in parameters", async () => {

    render(
      <RenderWrapper>
        <SignIn />
      </RenderWrapper>
    );

    fireEvent.change(screen.getByLabelText("Nome de usuário ou e-mail"), {
      target: { value: "alan@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "123456" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    });

    await waitFor(async () => {
      await expect(screen.getByLabelText("Nome de usuário ou e-mail")).toHaveValue("alan@example.com");
      await expect(screen.getByLabelText("Senha")).toHaveValue("123456");
    });

  });

  it("should submit form and call signIn + login + navigate", async () => {
    const mockResponse = {
      data: {
        success: true,
        token: 'mocked-token',
        message: 'Login successful'
      }
    };

    mockSignIn.mockResolvedValueOnce(mockResponse);

    render(
      <RenderWrapper mockContext={mockContext}>
        <SignIn />
      </RenderWrapper>
    );

    fireEvent.change(screen.getByLabelText("Nome de usuário ou e-mail"), {
      target: { value: "alan@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        username: 'alan@example.com',
        password: '123456',
      });

      expect(mockContext.login).toHaveBeenCalledWith("mocked-token");
      expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });

      expect(screen.getByLabelText("Nome de usuário ou e-mail")).toHaveValue("");
      expect(screen.getByLabelText("Senha")).toHaveValue("");
    });
  });

  it("should display an error message 'Não autorizado' when signIn returns 401", async () => {
    const mockError = {
      response: {
        status: 401,
        data: { "success": false, "error": "Invalid credentials" }
      }
    };

    mockSignIn.mockRejectedValueOnce(mockError);

    render(
      <RenderWrapper mockContext={mockContext}>
        <SignIn />
      </RenderWrapper>
    );

    fireEvent.change(screen.getByLabelText("Nome de usuário ou e-mail"), {
      target: { value: "teste@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "12342434" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    });

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        username: 'teste@example.com',
        password: '12342434',
      });
      expect(screen.getByText("Não autorizado")).toBeInTheDocument();
    });
  });

  it("should display an error message 'E-mail ou senha ausentes' when signIn returns 400", async () => {
    const mockError = {
      response: {
        status: 400,
        data: { "success": false, "error": "E-mail ou senha ausentes" }
      }
    };

    mockSignIn.mockRejectedValueOnce(mockError);

    render(
      <RenderWrapper mockContext={mockContext}>
        <SignIn />
      </RenderWrapper>
    );

    fireEvent.change(screen.getByLabelText("Nome de usuário ou e-mail"), {
      target: { value: "teste@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "12342434" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    });

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        username: 'teste@example.com',
        password: '12342434',
      });
      expect(screen.getByText("E-mail ou senha ausentes")).toBeInTheDocument();
    });
  });

  it("should display an error message 'Falha no login' when signIn returns err", async () => {
    const mockError = {
      response: {
        data: { "success": false, "error": "Falha no login" }
      }
    };

    mockSignIn.mockRejectedValueOnce(mockError);

    render(
      <RenderWrapper mockContext={mockContext}>
        <SignIn />
      </RenderWrapper>
    );

    fireEvent.change(screen.getByLabelText("Nome de usuário ou e-mail"), {
      target: { value: "teste@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "12342434" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    });

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        username: 'teste@example.com',
        password: '12342434',
      });
      expect(screen.getByText("Falha no login")).toBeInTheDocument();
    });
  });

  it("should display an error message 'Insira um nome de usuário ou e-mail válido.'", async () => {
    const mockError = {
      response: {
        data: { "success": false, "error": "Falha no login" }
      }
    };

    mockSignIn.mockRejectedValueOnce(mockError);

    render(
      <RenderWrapper mockContext={mockContext}>
        <SignIn />
      </RenderWrapper>
    );

    fireEvent.change(screen.getByLabelText("Nome de usuário ou e-mail"), {
      target: { value: "er" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "12342434" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Entrar" }));
    });


    expect(mockSignIn).not.toHaveBeenCalled();
    expect(screen.getByText("Insira um nome de usuário ou e-mail válido.")).toBeInTheDocument();

  });

  it("should display an error message 'A senha é obrigatória.'", async () => {
    const mockError = {
      response: {
        data: { "success": false, "error": "Falha no login" }
      }
    };

    mockSignIn.mockRejectedValueOnce(mockError);

    render(
      <RenderWrapper mockContext={mockContext}>
        <SignIn />
      </RenderWrapper>
    );

    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "dfasdfas" },
    });

    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "" },
    });

    fireEvent.blur(screen.getByLabelText("Senha"));

    await waitFor(() => {
      expect(screen.getByText("A senha é obrigatória.")).toBeInTheDocument();
    }
    );
  });
});


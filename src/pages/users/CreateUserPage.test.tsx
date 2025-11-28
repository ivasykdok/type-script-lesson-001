// src/pages/users/CreateUser.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateUserPage from "./CreateUserPage";
import { MemoryRouter } from "react-router-dom";
import { userApi } from "../../api/usersApi";

// Мок для navigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Мок для API
jest.mock("../../api/usersApi", () => ({
  userApi: {
    createUserData: jest.fn(),
  },
}));

describe("CreateUserPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields", () => {
    render(
      <MemoryRouter>
        <CreateUserPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Create User")).toBeInTheDocument();
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("enables submit button when form is valid", async () => {
    render(
      <MemoryRouter>
        <CreateUserPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/First name/i), "Roman");
    await userEvent.type(screen.getByLabelText(/Last name/i), "Ivasik");
    await userEvent.type(screen.getByLabelText(/Email/i), "roman@example.com");

    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toBeEnabled();
  });

  it("calls API and navigates on submit", async () => {
    (userApi.createUserData as jest.Mock).mockResolvedValue({
      id: "1",
      firstName: "Roman",
      lastName: "Ivasik",
      email: "roman@example.com",
    });

    render(
      <MemoryRouter>
        <CreateUserPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/First name/i), "Roman");
    await userEvent.type(screen.getByLabelText(/Last name/i), "Ivasik");
    await userEvent.type(screen.getByLabelText(/Email/i), "roman@example.com");

    const button = screen.getByRole("button", { name: /save/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(userApi.createUserData).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: "Roman",
          lastName: "Ivasik",
          email: "roman@example.com",
        })
      );
      expect(mockedNavigate).toHaveBeenCalledWith("/users");
    });
  });

  it("shows validation errors", async () => {
    render(
      <MemoryRouter>
        <CreateUserPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /save/i });
    await userEvent.click(button);

    expect(await screen.findAllByText(/is required/i)).toHaveLength(3);
  });
});
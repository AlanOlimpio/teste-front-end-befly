import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, type Mock } from 'vitest';
import { getHotels } from '@/api/get-hotels';
import { RenderWrapper } from '@/utils/renderWrapper';
import { vi } from 'vitest';
import { ListHotels } from './list-hotels';
import { act } from 'react';
import { hotelList } from '@/mocks/hotelList';


vi.mock('@/api/get-hotels', () => {
  return {
    getHotels: vi.fn()
  };
});

const mockgetHotels = getHotels as Mock;


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

const mockResponseHotelList = {
  success: true,
  data: hotelList,
  pagination: {
    total: 1000,
    limit: 10,
    offset: 0,
    hasMore: true
  }
}

describe("getHotels", () => {

  it("should render the list of hotels returned from the API", async () => {
    mockgetHotels.mockResolvedValueOnce(mockResponseHotelList);
    render(
      <RenderWrapper mockContext={mockContext}>
        <ListHotels />
      </RenderWrapper>
    );


    await waitFor(() => {

      const hotels = screen.getAllByText("Hotel Niles Istanbul");
      const countrys = screen.getAllByText("Turquia");
      const address = screen.getAllByText("Istambul");
      const reviews = screen.getAllByText("8.5");
      const stars = screen.getAllByTestId("star-rating");
      const buttons = screen.queryAllByRole("button", { name: "Ver detalhes" });

      expect(stars[0]).toBeInTheDocument();
      expect(hotels[0]).toBeInTheDocument();
      expect(countrys[0]).toBeInTheDocument();
      expect(address[0]).toBeInTheDocument();
      expect(reviews[0]).toBeInTheDocument();
      expect(buttons[0]).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Próxima página" }));
    });

    await waitFor(() => {
      expect(mockgetHotels).toHaveBeenCalledWith(
        {
          city: null,
          country: null,
          name: null,
          offset: "1",
          rating: null,
        }
      );

    });
  });


});


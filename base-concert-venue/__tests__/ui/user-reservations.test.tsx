import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("user reservation page shows correct button label", async () => {
  render(<UserReservations userId={1} />);

  const purchaseButton = await screen.findByText(/purchase more tickets/i);
  expect(purchaseButton).toBeInTheDocument();
});

test("display no reservations and 'purchase' button when no reservation exists", async () => {
  render(<UserReservations userId={0} />);

  const purchaseButton = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  expect(purchaseButton).toBeInTheDocument();

  const ticketsHeading = screen.queryByRole("heading", {
    name: /your tickets/i,
  });
  expect(ticketsHeading).not.toBeInTheDocument();
});

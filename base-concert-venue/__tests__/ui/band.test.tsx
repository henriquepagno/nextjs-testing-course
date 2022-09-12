import { render, screen } from "@testing-library/react";

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import BandPage from "@/pages/bands/[bandId]";

test("band component displays correct band information", async () => {
  const { fakeBands } = await readFakeData();

  render(<BandPage band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });

  expect(heading).toBeInTheDocument();
});

test("band component displays error correctly", async () => {
  render(
    <BandPage
      band={null}
      error="an error ocurred when searching for the data"
    />
  );

  const heading = screen.getByRole("heading", {
    name: /an error ocurred when searching for the data/i,
  });

  expect(heading).toBeInTheDocument();
});

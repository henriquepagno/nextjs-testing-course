import { rest } from "msw";

import { readFakeData } from "../fakeData";
import { fakeUserReservations } from "../fakeData/userReservations";

const baseUrl = "http://localhost:3000";

const showsHandler = rest.get(
  `${baseUrl}/api/shows/:showId`,
  async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;

    // Index / showId = 0 has seats available in fake data
    // Index / showId = 1 has NO seats available
    return res(ctx.json({ show: fakeShows[Number(showId)] }));
  }
);

const userReservationsHandler = rest.get(
  `${baseUrl}/api/users/:userId/reservations`,
  (req, res, ctx) => {
    const { userId } = req.params;

    // return fakeUserReservations if userId is 1; empty array otherwise
    const userReservations = Number(userId) === 1 ? fakeUserReservations : [];

    return res(ctx.json({ userReservations }));
  }
);

export const handlers = [showsHandler, userReservationsHandler];

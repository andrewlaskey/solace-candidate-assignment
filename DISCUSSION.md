## Things I would have liked to do with more time

Here are just a few things that I didn't get to or didn't prioritize because of the time constraint:

### Searching Specialties
I wanted to update the database query to search over the specialties column, but I was having trouble getting `arrayContains` to work correctly. Rather than wasting a bunch of time to get that solved, I left it out.

An alternative solution would also be to set up an API route that queried and returned all the unique specialties. Then on the page I could add a separate select dropdown for filtering specifically on that column.

### Testing
Before I began working on updating the database query I debated installing and setting up vitest or jest on the project. My preferred local development setup, projecting depending, is to have a terminal running `npm run dev` and another with `npm run test`, or often just the tests running watching for changes. Proving out my code's logic and behavior with tests can make everything smoother and reduce a lot of headaches.

Though it comes at the cost of some initial setup time. In this situation where the libraries/frameworks are familiar to ones I use or have used before but different (react -> vue, nextjs -> nuxtjs, drizzle -> sequelize)  I decided not set up any testing. In a scenario where I knew I would be spending more than a few hours on this repo, I would want to have some testing in place.
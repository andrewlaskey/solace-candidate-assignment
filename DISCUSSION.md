## TODO

I wanted to update the database query to search over the specialties column, but I was having trouble getting `arrayContains` to work correctly. Rather than wasting a bunch of time to get that solved, I left it out.

An alternative solution would also be to set up an API route that queried and returned all the unique specialties. Then on the page I could add a separate select dropdown for filtering specifically on that column.
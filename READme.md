# Routing and Middleware exercises

For this exercise I buildt a simple JSON API application where I stored a shopping list. I used an **array** to store my items in the shopping list.

Each item should be a JavaScript object with the keys of name, and price.  

My application has the following routes:

1. ***GET /items*** - this should render a list of shopping items.

Here is what a response looks like:

**[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]**  

2. ***POST /items*** - this route should accept JSON data and add it to the shopping list.

Here is what a sample request/response looks like:

**{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}**  

3. ***GET /items/:name*** - this route should display a single item’s name and price.

Here is what a sample response looks like:

**{“name”: “popsicle”, “price”: 1.45}**  

4. ***PATCH /items/:name***, this route should modify a single item’s name and/or price.

Here is what a sample request/response looks like:

**{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}**  

5. ***DELETE /items/:name*** - this route should allow you to delete a specific item from the array.

Here is what a sample response looks like:

**{message: “Deleted”}**
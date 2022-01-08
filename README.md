# Pricing Page
React and SQLite application, using typescript and sequelize

Also used Express and Bootstrap 5

## How to run it

```
cd backend
npm install
npm run start:dev
```

It's already populated with 3 mockup plans, being Free, Pro and Plus.
Now to start the front-end:

```
npm install
npm run

```

With this, when loaded, you should be able to see a screen like the demo :

![Alt Text](https://github.com/abdulhdr/pricing-page/blob/main/demo.gif)


## API Routes

They are all related to the SQLite DB, in the `/api/` route

### GET

Return the entries on the Plans table, no authentication required

### POST

Creates a new plan entry in the DB, expects a JSON body with the following structure
```typescript
{
    "name": "New Plan Name",
    "price": 123,
    "annualDisc": 15,   // Percentage value, meaning 15%
    "repos": 123,
    "members": 123,
    "storage": 12,      // In GBs, it's going to be converted to TB in the front end
    "support": "24/7",  // Isn't required
 }
```

There's also the `/api/mockup/` post route that's going to create the mockup plans

### PUT

Receives an object and string in a JSON body, with the following structure

```typescript
{
    "update":{              // Values to update in an object
        "name": "grátis 🟩🟨"        // assigning a new name
        "price": 0                    // assigning a new price
    },
    "name": "Name of the plan to update"
}
```

### DELETE

Receives just the name of an existing plan inside a JSON object

```typescript
{
  "name": "Free"
}
```






